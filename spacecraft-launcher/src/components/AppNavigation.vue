<template>
    <span>
        <v-navigation-drawer app v-model="drawer" class="blue-grey lighten-2" dark disable-resize-watcher>
            <v-list>
                <template v-for="(item, index) in items">
                    <v-list-tile :key="index">
                        <v-list-tile-content>
                            {{item.title}}
                        </v-list-tile-content>
                    </v-list-tile>  
                    <v-divider :key="`divider-${index}`"></v-divider>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app color="blue-grey darken-3" dark>
            <!-- <v-toolbar class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar> -->
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-toolbar-title>{{appTitle}}</v-toolbar-title>
            <v-btn flat class="hidden-sm-and-down">Menu</v-btn>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-btn flat class="hidden-sm-and-down">SIGN IN</v-btn>
            <v-btn color="blue-grey lighten-3" class="hidden-sm-and-down">JOIN</v-btn>
        </v-toolbar>
        <Bubble>
            <a id="home" href="#">
                <span>Home</span>
            </a>
        </Bubble>
    </span>
</template>

<script>
import { Bubble } from 'vue-burger-menu'  // import the CSS transitions you wish to use, in this case we are using `Bubble`
export default {
    name: 'AppNavigation',
    data() {
        return {
            appTitle: 'Meal Prep',
            drawer: false,
            items: [
                { title: 'Menu' },
                { title: 'Sign In' },
                { title: 'Join' }
            ]
        };
    },
    components: {
    Bubble // Register your component
    }
};
</script>

<style scoped>
</style>