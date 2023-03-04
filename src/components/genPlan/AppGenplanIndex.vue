<template lang="pug">
#genPlan(:class="{edit:editMode}" @click="editPath")
	img(src="@/assets/plan.png")
div
	button(@click="createPath") Edit mode - {{editMode}}
	button(@click="editMode=false") false Edit mode - {{editMode}}
</template>
<script>
	import { SVG } from '@svgdotjs/svg.js'
	import '@/plugins/svg.path.js'
	export default {
		data(){
			return{
				draw: '',
				editMode: false,
				currentEl: '',
				flat: {
					id: 0,
					name: 'Квартира 1',
					description: 'Квартира площадью ХХХ, стоимостью YYY, на Z этаже',
					select: '0_12353_123',
					map: []
				}
			}
		},
		mounted() {
			this.drawInit()
		},
		methods: {
			drawInit(){
				this.draw = SVG().addTo('#genPlan').size('100%', '100%')
				const path = this.draw.path().M(10, 10).L(150, 10).L({x:150, y:150}).Z()
				console.log('count', path.getSegmentCount())
			},
			createPath(){
				this.editMode = true
				// path.plot()  Обновление данных
				this.currentEl = this.draw.path()
			},
			editPath(e){
				if(this.editMode){
					console.log(e.pageX, e.pageY)
					this.currentEl.draw
						.M({x: 100, y: 100})
						.L({x: 150, y: 150})
						.L({x: 100, y: 150})
						.Z()
				}
			}
		}
	}
</script>

<style scoped>

</style>