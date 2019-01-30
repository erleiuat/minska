<template>
    <v-card :color="card.type" :dark="card.type ? true:false" height="100%">
        <v-card-text>

            <v-layout row wrap text-xs-center>
                <v-flex xs12>
                    <h3>{{ card.title }}</h3>
                </v-flex>
                <v-flex xs12>
                    <h1>{{ card.value }} {{ card.unit }}</h1>
                </v-flex>
                <v-flex xs12>
                    {{ card.description }}
                </v-flex>
            </v-layout>

        </v-card-text>
    </v-card>
</template>

<script>
export default {

    name: 'FactCard',
    props: {
        card: Object
    }

}
</script>
