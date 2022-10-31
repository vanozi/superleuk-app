<template>

  <base-view>
    <template #default-view-title>Uren - invoer</template>
    <template #default-view-body>
      <ion-grid>
        {{data}}
        <ion-row class="ion-justify-content-center ion-align-items-center">
          <ion-col class="ion-text-center">
            <n-button text style="font-size: 24px" @click="transformDate('subtract', 7)">
              <n-icon>
                <back-icon />
              </n-icon>
            </n-button>
          </ion-col>
          <ion-col class="ion-text-center ion-align-text-center">
            <div class="ion-align-text-center">
              <h4>
                {{ weekObject.weekNumber }}
              </h4>
            </div>
          </ion-col>
          <ion-col class="ion-text-center">
            <n-button text style="font-size: 24px" v-if="nextWeekAllowed" @click="transformDate('add', 7)">
              <n-icon>
                <forward-icon />
              </n-icon>
            </n-button>
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-center ion-padding">
          {{ formatDate(weekObject.weekStart) }} -
          {{ formatDate(weekObject.weekEnd) }}
        </ion-row>
        <ion-row class="
            ion-justify-content-center ion-align-items-center ion-margin-top
          ">
          <!-- <n-data-table  :columns="columns" :data="data" :summary="summary" /> -->
        </ion-row>
      </ion-grid>
    </template>
  </base-view>
</template>


  
<script>
import {
  defineComponent,
  h,
  ref,
  computed,
  reactive,
  // onMounted,
  // watch,
  // unref
} from "vue";
import moment from "moment";
import { ArrowBack as BackIcon } from "@vicons/ionicons5";
import { ArrowForward as ForwardIcon } from "@vicons/ionicons5";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import api from "../../api";

moment.locale("nl");

const createColumns = () => {
  return [
    {
      type: "expand",
      expandable: (rowData) => rowData.description.length > 0,
      renderExpand: (rowData) => {
        return rowData.description;
      },
    },
    {
      title: "Datum",
      key: "date",
      render(row) {
        console.log(row)
        return moment(row.date, "YYYY-MM-DD").format("ddd DD MMM YYYY");
      },
    },
    {
      title: "Uren",
      key: "hours",
    },
  ];
};


async function getWeekHours(weekData) {
      let response = await api.get("/working_hours/between_dates/", {
        params: {
          from_date: weekData.weekStart.format("YYYY-MM-DD"),
          to_date: weekData.weekEnd.format("YYYY-MM-DD"),
        },
      });
  
      return response.data;
    }

const createSummary = (pageData) => {
  return {
    datum: {
      value: h(
        "span",
        { style: { color: "black", float: "right" } },
        "Totaal:  " +
        pageData.reduce((previousValue, row) => previousValue + row.uren, 0)
      ),
      colSpan: 3,
    },
  };
};



export default defineComponent({
  components: { BackIcon, ForwardIcon, IonGrid, IonRow, IonCol },
  async setup() {
    // const data = ref();
    // const router = new useRouter();
    let currentDate = ref(moment());
    const weekObject = reactive({
      weekStart: computed(() => currentDate.value.clone().startOf("isoWeek")),
      weekEnd: computed(() => currentDate.value.clone().endOf("isoWeek")),
      weekNumber: computed(() => currentDate.value.isoWeek()),
    });



    // lifecycle hooks
    // onMounted(async function () {
    //   const response = await getWeekHours(weekObject);
    //   data.value = response.data
    //   console.log(unref(data))
    // })


    function formatDate(dateToTransform) {
      return moment(dateToTransform, "YYYY-MM-DD").format("ddd DD MMM YYYY");
    }

    function transformDate(direction, numberOfDays) {
      if (direction == "subtract") {
        currentDate.value = moment(
          currentDate.value.subtract(numberOfDays, "days")
        );
      } else if (direction == "add") {
        currentDate.value = moment(currentDate.value.add(numberOfDays, "days"));
      }
    }

    const nextWeekAllowed = computed(() => {
      if (weekObject.weekNumber >= moment().isoWeek()) {
        return false;
      } else {
        return true;
      }
    })

    // const store = useStore();

    // watch([data], function (newValue, oldValue) {
    //   console.log(newValue, oldValue)
    // });
    return {
      IonGrid,
      IonRow,
      IonCol,
      summary: createSummary,
      data: await getWeekHours(weekObject),
      columns: createColumns(),
      weekObject,
      BackIcon,
      ForwardIcon,
      formatDate,
      nextWeekAllowed,
      transformDate,
    };
  },

});
</script>