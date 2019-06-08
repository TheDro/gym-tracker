<template>
    <Page class="page">
        <ActionBar title="Gym Tracker">
            <ActionItem @tap="showArchive"
                text="Open Archive"
                android.position="popup"
                >
            </ActionItem>

        </ActionBar>
        <TabView androidTabsPosition="bottom" 
            :selectedIndex="selectedIndex"
            @selectedIndexChange="indexChange">
            <TabViewItem title="Exercises">
                <Exercises />
            </TabViewItem>
            <TabViewItem title="Workouts">
                <Workouts />
            </TabViewItem>
            <TabViewItem title="Calendar">
                <Calendar />
            </TabViewItem>
        </TabView>

    </Page>
</template>

<script>
    import Calendar from './Calendar'
    import Exercises from './Exercises'
    import Workouts from './Workouts'
    import Archive from './Archive'

    export default {
        components: {
            Calendar,
            Exercises,
            Workouts
        },
        data() {
            return {};
        },
        methods: {
            indexChange() {

            },
            showArchive() {
                console.log('archive')
                this.$navigateTo(Archive)
            }
        }
    };
</script>

<style scoped>
    .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 15;
    }

    .description-label {
        margin-bottom: 15;
    }
</style>
<style> 
    .far {
        font-family: "Font Awesome 5 Free", "fa-regular-400"
    }
    .fas {
        font-family: "Font Awesome 5 Free", "fa-solid-900"
    }
    Button.icon {
        width: 50;
    }
</style>