import { createStore } from "vuex";

const store = createStore({
    state(){
        return{
            svg: [
                {
                    id: 1,
                    name: 'Квартира 1',
                    description: 'Квартира площадью ХХХ, стоимостью YYY, на Z этаже',
                    select: '0_12353_123',
                    map: []
                },
                {
                    id: 2,
                    name: 'Квартира 2',
                    description: 'Квартира площадью ХХХ, стоимостью YYY, на Z этаже',
                    select: '0_12353_123',
                    map: []
                },
                {
                    id: 3,
                    name: 'Квартира 3',
                    description: 'Квартира площадью ХХХ, стоимостью YYY, на Z этаже',
                    select: '0_12353_123',
                    map: []
                }
            ]
        }
    },
    mutations: {
        saveSvg(state, data){
            state.svg = data
}
    }
})

export default store