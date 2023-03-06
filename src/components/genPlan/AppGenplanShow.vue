<template lang="pug">
.container
	.link
		router-link(to="/") Редактировать
	#genPlan
		img(src="@/assets/plan.png")
</template>

<script>
	import { mapState } from 'vuex'
	import {SVG} from '@svgdotjs/svg.js'
	export default {
		data(){
			return{
				draw: ''
			}
		},
		computed: mapState({
			svg: state => state.svg
		}),
		mounted() {
			this.$nextTick(() => {
				this.mapInit()
			})
		},
		methods: {
			mapInit(){
				this.draw = SVG().addTo('#genPlan')
					.size('100%', '100%')
					.fill('rgba(76, 226, 127, 0.4)')
					.viewbox(0, 0, 1080, 745)
					.stroke('#4CE27F')
					.attr({'stroke-width': 2})
				this.svg.forEach(path => {
					if(path.map.length){
						this.draw.path(path.map).attr({visible: 'hidden', transform: 'matrix(1 0 0 1 0 0)', class: 'svgPath'})
							.on('mouseenter', this.hoverPath)
					}
				})
			},
			hoverPath(el){
				el.attr({visible: 'visible'})
			}
		}
	}
</script>