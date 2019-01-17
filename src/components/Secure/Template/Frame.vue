<template>
    <v-card>
        <v-img src="http://www.chuchitisch.ch/chuchitisch/download_picture/lightroom/585_Griechischer+Joghurt+mit+Himbeeren.png" height="300px">
            <v-layout column fill-height>
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn dark icon class="mr-3">
                        <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn dark icon>
                        <v-icon>delete</v-icon>
                    </v-btn>
                </v-card-title>
                <v-spacer></v-spacer>
                <v-card-title class="white--text pt-5">
                    <div class="display-1 pl-3 pt-5">
                        Joghurt
                    </div>
                </v-card-title>
            </v-layout>
        </v-img>
        <v-list>
            <v-list-tile >
                <v-list-tile-content>
                    <v-list-tile-sub-title>Standartmenge</v-list-tile-sub-title>
                    <v-list-tile-title>240 g/ml</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-content>
                    <v-list-tile-sub-title>KCal pro 100 ml/g</v-list-tile-sub-title>
                    <v-list-tile-title>120</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-card>
</template>

<script>
export default {

    name: 'Frame',
    props: {

    }

}
</script>
