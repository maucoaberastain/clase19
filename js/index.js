const { createApp } = Vue;

const URL_API = 'https://swapi.dev/api/';
const app = createApp({
    data(){
        return{
            page:1,
            planetas:[],

        }
    },
    methods:{
        fetchPlanetas(url){
            fetch(url)
                .then(response => response.json())
                .then(data => this.planetas = data.results)
                .catch(err => {
                    console.log(err);
                })  

        },
        nextPage(){
            this.page++;
            this.fetchPlanetas(`${URL_API}planets/?page=${this.page}`);
        },
        prevPage(){
            this.page = (this.page==1)?1:this.page--; //Esto es un if de una linea
            this.fetchPlanetas(`${URL_API}planets/?page=${this.page}`);
        }

    },
    created(){
        this.fetchPlanetas(`${URL_API}planets/`)
    }

});

app.component(
    'planeta-item',
    {
        props:['planet'],
        template:`
            <div class="planeta-item">
                <div class="planeta-item-detalle">
                    <p class="planeta-item-detalle-nombre">{{planet.name}}</p>
                    <p class="planeta-item-detalle-clima">{{planet.climate}}</p>
                </div>
            </div>
        `,
    }
)
app.mount('#app');