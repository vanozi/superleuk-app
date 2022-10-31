<template >
    <ion-row class="ion-justify-content-center ion-padding-top">
        <n-button-group>
            <n-button round size="small">
                <template #icon>
                    <n-icon>
                        <add-icon />
                    </n-icon>
                </template>
                toevoegen
            </n-button>
            <n-button  strong secondary type="info" disabled size="small">
                acties
            </n-button>
            <n-button round size="small">
                <template #icon>
                    <n-icon>
                        <check-mark-icon />
                    </n-icon>
                </template>
                indienen
            </n-button>

        </n-button-group>

    </ion-row>
</template>
<script>
import { IonRow } from '@ionic/vue'
import { AddCircleOutline as AddIcon, CheckmarkDoneOutline as CheckMarkIcon } from "@vicons/ionicons5";
export default {
    components: {
        IonRow,AddIcon,CheckMarkIcon
    }
};
</script>
<style >

</style>