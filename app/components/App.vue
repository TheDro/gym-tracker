<template>
    <Page class="page">
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

        <!-- <ScrollView>
            <StackLayout class="home-panel">
                
                <Label textWrap="true" text="Play with NativeScript!" class="h2 description-label" />
                <Label textWrap="true" text="Write code in the editor or drag and drop components to build a NativeScript mobile application."
                    class="h2 description-label" />
                <Label textWrap="true" text="Scan the QR code with your mobile device and watch the changes sync live while you play with the code."
                    class="h2 description-label" />
            </StackLayout>
        </ScrollView> -->



    </Page>
</template>

<script>
    import Calendar from './Calendar'
    import Exercises from './Exercises'
    import Workouts from './Workouts'

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
            indexChange: function() {

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
    .fa-reg {
        font-family: "Font Awesome 5 Free", "fa-regular-400"
    }
    Button.icon {
        width: 50;
    }
</style>