<template>
    <v-container grid-list-md pa-0>
        <v-layout row wrap>

            <v-flex xs10 class="display-1">
                {{ $t('views.templates')}}
            </v-flex>
            <v-flex xs2 class="text-xs-right">
                <Adder/>
            </v-flex>

        </v-layout>
        <v-layout row wrap>
            <v-flex v-for="item in templates" :key="item.id" xs12 sm6 md4>
                <Frame :item="item"/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Frame from '@/components/Secure/Template/Frame'
import Adder from '@/components/Secure/Template/Adder'

export default {

    name: 'Templates',
    components: {
        Frame,
        Adder
    },

    computed: {
        templates () {
            return this.$store.state.content.templates
        }
    },

    mounted () {
        if (!this.$store.state.content.templates) {
            var vm = this
            vm.axiosPost({
                url: 'template/read/',
                data: {
                    token: this.$store.state.auth.token
                }
            }).then(function (response) {
                vm.$store.state.content.templates = response.data.content
            }).catch(function () {
                vm.$notify({
                    group: 'default',
                    type: 'warning',
                    title: vm.$t('alerts.empty.title'),
                    text: vm.$t('alerts.empty.text')
                })
            }).then(function () {
                vm.$data.loading = false
            })
        }
    }

}
</script>
