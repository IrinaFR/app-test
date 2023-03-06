<template lang="pug">
.container
	.link
		router-link(to="/show") Просмотр
	#genPlan(:class="{edit:editMode}")
		img(src="@/assets/plan.png")
	.setting
		div
			.form-group
				label Название
				input(type="text" placeholder="Название" v-model="current.info.name" )
			.form-group
				label Принадлежность
				select(v-model="current.info.select")
					option 0_12353_123
					option 0_56789_567
			.form-group
				button(@click="saveSvg") Сохранить
		.form-group
			label Описание
			textarea(placeholder="Описание" v-model="current.info.description")
	.listFlats
		.flat(v-for="svg in listSvg" :key="svg.id")
			.name {{svg.name}}
			.controls
				span.show(@click="add(svg)" v-if="!svg.map.length" ) Добавить
				span.show(@click="show(svg)" v-else) Просмотр
				span.edit(@click="add(svg)" v-if="svg.map.length") Изменить
		.addMore(@click="createData") + Добавить

</template>
<script>
	import { mapState } from 'vuex'
	import {SVG} from '@svgdotjs/svg.js'
	export default {
		data(){
			return{
				draw: '',
				editMode: false,
				current: {
					el: '',
					info: {}
				},
				listSvg: []
			}
		},
		computed: mapState({
			svg: state => state.svg
		}),
		mounted() {
			this.drawInit()
			this.getFlats()
		},
		methods: {
			getFlats(){
				this.listSvg = Object.assign([], this.svg)
			},
			drawInit(){
				this.draw = SVG()
					.addTo('#genPlan')
					.size('100%', '100%')
					.fill('rgba(76, 226, 127, 0.4)')
					.viewbox(0, 0, 1080, 745)
					.stroke('#4CE27F')
					.attr({'stroke-width': 4})
					.click(this.editPath)

			},
			createPath(){
				this.editMode = true
				this.current.el = this.draw.path()
			},
			closePath(el){

				const idx = Number(el.target.id)
				if(!idx){
					this.current.info.map.push('z')
					this.current.el.plot(this.current.info.map)
					this.editMode = false
					this.current = {
						el: '',
						info: this.current.info
					}
				}

			},
			editPath(e){
				if(this.editMode){
					const length = this.current.info.map.length

					const point = [
						!length?'M':'L',
						e.offsetX,
						e.offsetY
					]

					const updateArc = ['M', e.offsetX, e.offsetY, 'a', 4, 4, 0, 1, 0, 0.001, 0, 'Z']
					this.draw.path(updateArc).attr({
						transform: 'matrix(1 0 0 1 0 0)',
						fill: '#fff',
						'stroke-width': 2,
						class: 'svgArc',
						id: `${length}`
					}).click(this.closePath)

					this.current.info.map.push(point)

					let allPath = ''
					this.current.info.map.forEach(section => {
						section.forEach(pos => {
							allPath += `${pos} `
						})
					})
					this.current.el.plot(allPath)
				}
			},
			add(flat){
				this.draw.clear()
				this.current.info = flat
				window.scrollTo(0,0)
				this.createPath()
			},
			show(svg){
				this.draw.clear()
				this.draw.path(svg.map)
				window.scrollTo(0,0)
			},
			saveSvg(){
				this.$store.commit('saveSvg', this.listSvg)
					console.log('Saved')
			},
			createData(){
				this.listSvg.push({
					id: new Date().getTime(),
					name: '',
					description: '',
					select: '',
					map: []
				})
				this.add(this.listSvg.at(-1))
			}
		}
	}
</script>