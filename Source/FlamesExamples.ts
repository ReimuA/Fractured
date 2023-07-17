import { createTransform } from "./IFSTransform"
import { linearVariation, swirlVariation } from "./Variations"

export const flamesExample = {
	components: [
		{
			weight: 0.125,
			color: {
				r: 0.63, g: 0.72,b:0.62
			},
			transform: createTransform(-0.177,-1.035,-0.394,-0.194,0.412,1.465, 0),
			variations: [
				{
					variations: linearVariation,
					weight: 0.6
				},
				{
					variations: swirlVariation,
					weight: 0.4
				}
			]
		},
		{
			weight: 0.8203125,
			color: {
				r: 0.08,g:0.75,b:0.82
			},
			transform: createTransform(1.226,1.342,0.592,-0.497,-1.261,-1.416, 0),
			variations: [
				{
					variations: linearVariation,
					weight: 0.55
				},
				{
					variations: swirlVariation,
					weight: 0.45
				}
			]
		}
	]
}