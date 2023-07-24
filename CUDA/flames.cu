#include <iostream>
#include <fstream>
#include <math.h>
#include <curand.h>
#include <curand_kernel.h>
#include <stdlib.h>

#include "json.hpp"

#define PI (3.14159)

using json = nlohmann::json;

typedef struct IFSTransform {
    float a;
    float b;
    float c;
    float d;
    float e;
    float f;
}   IFSTransform;

typedef struct WeightedVariation {
    char name[42];
    float weight;
} WeightedVariation;

typedef struct FlamesComponent {
    float weight;
    IFSTransform transform;
    WeightedVariation weightedVariations[5];
} FlamesComponent;

typedef struct Flames {
    int ResolutionX;
    int ResolutionY;
    FlamesComponent finalComponent;
    FlamesComponent components[4];
}   Flames;

__device__
float modn(float a, float b)
{
  int tmp = (int)(a / b);
  return a - ((float) tmp * b);
}				

__device__
void processFlamesComponent(float* x, float* y, FlamesComponent* component) {
    float newX = 0;
    float newY = 0;
    auto t = component->transform;
    float tpx = t.a * (*x) + t.b * (*y) + t.c;
    float tpy = t.d * (*x) + t.e * (*y) + t.f;

    for (auto i = 0; i < 5; i++) {
        auto variation = component->weightedVariations[i];
        auto name = variation.name;
        float vpx = 0;
        float vpy = 0;

        float length = sqrt(tpx * tpx + tpy * tpy);
        float l2 = length * length;


        if (name[0] == 'S') {
            float cosine = cos(l2);
            float sine = sin(l2);
            vpx = tpx * sine - tpy * cosine;
            vpy = tpx * cosine + tpy * sine;
        }

        if (name[0] == 'F') {
            float theta = atan2(py, px);
            float tc2 = PI * t.c * t.c;
            float d = modn(theta + t.f, tc2);

            if (d > 0.5) {
				vpx = length * cos(theta - tc2 / 2);
				vpy = length * sin(theta - tc2 / 2);
			} else {
                vpx = length * cos(theta + tc2 / 2);
                vpy = length * sin(theta + tc2 / 2);
            }
        }

        if (name[0] == 'L') {
            vpx = tpx;
            vpy = tpy;
        }

        newX += vpx * variation.weight;
        newY += vpy * variation.weight;
    }

    *x = newX;
    *y = newY;
}

__global__
void processFlames(int* heatmap, Flames* flames)
{
    curandState state;

    curand_init(clock() + threadIdx.x, 0, 0, &state);
    float y = curand_uniform(&state) * 2 - 1;
    float x = curand_uniform(&state) * 2 - 1;

    for (int i = 0; i < 1e7; i++) {
        float r = curand_uniform(&state);
        float accumulator = 0;

        FlamesComponent component = flames->components[0];
        for (auto j = 0; j < 4; j++) {
            accumulator += flames->components[j].weight;
            if (accumulator > r) {
                component = flames->components[j];
                break;
            }
        }

        processFlamesComponent(&x, &y, &component);

        if (i > 20) {
            auto px = round((x + 2 * (flames->ResolutionX / flames->ResolutionY)) * (flames->ResolutionY / 4));
            auto py = round((y + 2) * (flames->ResolutionY / 4));

            if (px >= 0 && px < flames->ResolutionX && py >= 0 && py < flames->ResolutionY) {
                int idx = py * flames->ResolutionX + px;
                atomicAdd(&heatmap[idx], 1);
            }
        }
    }
}

void writeResult(int* heatmap, int length) {
    std::ofstream f("res.json");
    if (f.is_open())
    {
        f << "[";
        for (int i = 0; i < length; i++) {
            f << (heatmap[i]);
            if (i != length - 1)
                f << ",";
        }

        f << "]";

        f.close();
    }
    else
        std::cout << "Unable to open file";
}

void variationFromJObject(WeightedVariation* variation, json obj) {
    memset(variation->name, '\0', 42);
    variation->weight = obj["weight"];
    std::string name(obj["variation"]["name"]);
    strcpy(variation->name, name.c_str());
}

void flamesComponentFromJObject(FlamesComponent* component, json obj) {
    component->transform.a = obj["transform"]["a"];
    component->transform.b = obj["transform"]["b"];
    component->transform.c = obj["transform"]["c"];
    component->transform.d = obj["transform"]["d"];
    component->transform.e = obj["transform"]["e"];
    component->transform.f = obj["transform"]["f"];


    std::cout << component->transform.a << std::endl;
    std::cout << component->transform.b << std::endl;
    std::cout << component->transform.c << std::endl;
    std::cout << component->transform.d << std::endl;
    std::cout << component->transform.e << std::endl;
    std::cout << component->transform.f << std::endl;

    component->weight = obj["weight"];

    for (int i = 0; i < 5; i++) {
        variationFromJObject(&component->weightedVariations[i], obj["weightedVariations"].at(i));

        std::cout << component->weightedVariations[i].weight << std::endl;
        std::cout << component->weightedVariations[i].name << std::endl;
    }
}

void readFlames(Flames* flames, char* s) {
    std::string filename(s);
    std::ifstream input(s);
    json data = json::parse(input);

    flames->ResolutionX = data["resolution"]["x"] * 2;
    flames->ResolutionY = data["resolution"]["y"] * 2;

    for (int i = 0; i < 4; i++) {
        flamesComponentFromJObject(&(flames->components[i]), data["components"].at(i));
    }

    flamesComponentFromJObject(&flames->finalComponent, data["final"]);

    std::cout << data["resolution"]["x"] << std::endl;
    std::cout << data["resolution"]["y"] << std::endl;
}


int main(int argc, char** argv)
{
    Flames flames;
    
    if (argc != 2) {
        std::cout << "Usage : ./a.exe flamePath" << std::endl;
        return 1;
    }
    else {
        readFlames(&flames, argv[1]);
    }


    int* heatmap;
    int heatmapLength = flames.ResolutionX * flames.ResolutionY;
    Flames* flamesPtr;

    // Allocate Unified Memory – accessible from CPU or GPU
    cudaMallocManaged(&flamesPtr, sizeof(Flames));

    printf("\n Error msg: %s", cudaGetErrorString(cudaGetLastError()));
    cudaMallocManaged(&heatmap, sizeof(int) * heatmapLength);
    printf("\n Error msg: %s", cudaGetErrorString(cudaGetLastError()));
    cudaMemset(heatmap, 0, heatmapLength * sizeof(int));
    printf("\n Error msg: %s", cudaGetErrorString(cudaGetLastError()));
    cudaMemcpy(flamesPtr, &flames, sizeof(Flames), cudaMemcpyHostToDevice);
    printf("\n Error msg: %s", cudaGetErrorString(cudaGetLastError()));

    processFlames << <1024, 1 >> > (heatmap, flamesPtr);

    // Wait for GPU to finish before accessing on host
    cudaDeviceSynchronize();

    printf("\n Error msg: %s", cudaGetErrorString(cudaGetLastError()));
    writeResult(heatmap, heatmapLength);

    cudaFree(heatmap);
    cudaFree(flamesPtr);
    return 0;
}