<template>
  <div class="hello">
    <DataTable :value="customerListDataComputed" tableStyle="min-width: 50rem">
      <PrimeColumn field="name" header="Name"></PrimeColumn>
      <PrimeColumn field="date_of_birth" header="DOB"></PrimeColumn>
      <PrimeColumn field="aadhar_number" header="Aadhar"></PrimeColumn>
      <PrimeColumn field="registration_date" header="Registered"></PrimeColumn>
      <PrimeColumn field="phone_number" header="Phone No."></PrimeColumn>
      <PrimeColumn field="current_plan" header="Plan">
        <template #body="slotProps"> 
          {{ planDict[slotProps.data.current_plan] }}
        </template>
      </PrimeColumn>
      <PrimeColumn field="plan_activation_date" header="Activation Date"></PrimeColumn>
      <PrimeColumn field="plan_status" header="Status"></PrimeColumn>
      <PrimeColumn header="Actions">
        <template #body="slotProps">
          <template v-if="slotProps.data.current_plan">
            <PrimeButton @click="displayPlanRenewimeDialog(slotProps)" label="Renew Plan" />
            <PrimeButton @click="displayChangePlanPrimeDialog(slotProps)" label="Change Plan" />
          </template>
          <template v-else>
            <PrimeButton @click="displayAddPlanPrimeDialog(slotProps)" label="Add Plan" />
          </template>
        </template>
      </PrimeColumn>

    </DataTable>

    <PrimeButton @click="displayCustomerRegistrationPrimeDialog()" label="Add New Customer" />

    <PrimeDialog v-model:visible="showCustomerRegistrationPrimeDialog" modal header="Register Customer" :style="{ width: '25rem' }">
      <div class="flex align-items-center gap-3 mb-3">
          <label for="username" class="font-semibold w-6rem">Customer Name</label>
          <InputText id="username" v-model="newCustomer.name" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
          <label for="email" class="font-semibold w-6rem">Email</label>
          <InputText id="email" v-model="newCustomer.email" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
          <label for="dob" class="font-semibold w-6rem">DOB</label>
          <InputText id="dob" v-model="newCustomer.date_of_birth" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
          <label for="aadhar" class="font-semibold w-6rem">Aadhar Number</label>
          <InputText id="aadhar" v-model="newCustomer.aadhar_number" class="flex-auto" autocomplete="off" />
      </div>

      <div class="flex align-items-center gap-3 mb-5">
          <label for="phone" class="font-semibold w-6rem">Phone Number</label>
          <InputText id="phone" v-model="newCustomer.phone_number" class="flex-auto" autocomplete="off" />
      </div>

      <div class="flex justify-content-end gap-2">
        <label for="phone" class="font-semibold w-6rem">Telecom Plan</label>
        <PrimeDropdown v-model="activeCustomer.current_plan" :options="telecomPlans" optionValue="code" optionLabel="name" placeholder="Select a Plan" class="w-full md:w-14rem" />
      </div>
      <div class="flex justify-content-end gap-2">
          <PrimeButton type="button" label="Cancel" severity="secondary" @click="showCustomerRegistrationPrimeDialog = false"></PrimeButton>
          <PrimeButton type="button" label="Add Customer" @click="addNewCustomer"></PrimeButton>
      </div>
    </PrimeDialog>

    <PrimeDialog v-model:visible="showPlanRenewimeDialog" modal header="Renew Plan" :style="{ width: '25rem' }">
      <div class="flex align-items-center gap-3 mb-3">
        Confirm Current Plan Renewal
      </div>

      <div class="flex justify-content-end gap-2">
        Customer Name -   {{ activeCustomer.name }}
      </div>

      <div class="flex justify-content-end gap-2">
        Current Plan -   {{ planDict[activeCustomer.current_plan] }}
      </div>

      <div class="flex justify-content-end gap-2">
          <PrimeButton type="button" label="Cancel" severity="secondary" @click="visible = false"></PrimeButton>
          <PrimeButton type="button" label="Renew Plan" @click="updatePlanForCustomer"></PrimeButton>
      </div>
    </PrimeDialog>

    <PrimeDialog v-model:visible="showChangePlanPrimeDialog" modal header="Update Plan" :style="{ width: '25rem' }">
      <div class="flex align-items-center gap-3 mb-3">
       Please select new plan to continue
      </div>

      <div class="flex justify-content-end gap-2">
        Customer Name -   {{ activeCustomer.name }}
      </div>

      <div class="flex justify-content-end gap-2">
        Current Plan -   {{ planDict[activeCustomer.current_plan] }}
      </div>

      <div class="flex justify-content-end gap-2">
        <PrimeDropdown v-model="activeCustomer.current_plan" :options="telecomPlans" optionValue="code" optionLabel="name" placeholder="Select a Plan" class="w-full md:w-14rem" />
      </div>

      <div class="flex justify-content-end gap-2">
          <PrimeButton type="button" label="Cancel" severity="secondary" @click="visible = false"></PrimeButton>
          <PrimeButton type="button" label="Update Plan" @click="updatePlanForCustomer"></PrimeButton>
      </div>
    </PrimeDialog>

    <PrimeDialog v-model:visible="showAddPlanPrimeDialog" modal header="Add Plan" :style="{ width: '25rem' }">
      <div class="flex align-items-center gap-3 mb-3">
       Please select new plan to continue
      </div>

      <div class="flex justify-content-end gap-2">
        Customer Name -   {{ activeCustomer.name }}
      </div>

      <div class="flex justify-content-end gap-2">
        <PrimeDropdown v-model="activeCustomer.current_plan" :options="telecomPlans" optionValue="code" optionLabel="name" placeholder="Select a Plan" class="w-full md:w-14rem" />
      </div>


      <div class="flex justify-content-end gap-2">
          <PrimeButton type="button" label="Cancel" severity="secondary" @click="visible = false"></PrimeButton>
          <PrimeButton type="button" label="Add Plan" @click="addNewPlanforCustomer"></PrimeButton>
      </div>
    </PrimeDialog>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    displayCustomerRegistrationPrimeDialog() {
      this.newCustomer = {
        name: null,
        email: null,
        date_of_birth: null,
        aadhar_number: null,
        phone_number: null,
        current_plan: null,
        plan_activation_date: null,
        plan_status: null
    }
      this.showCustomerRegistrationPrimeDialog = true;
    },
    displayPlanRenewimeDialog(slotProps) {
      this.activeCustomer = slotProps.data
      this.showPlanRenewimeDialog = true;
    },
    displayChangePlanPrimeDialog(slotProps) {
      this.activeCustomer = slotProps.data
      this.showChangePlanPrimeDialog = true;
    },
    displayAddPlanPrimeDialog(slotProps) {
      this.activeCustomer = slotProps.data
      this.showAddPlanPrimeDialog = true;
    },
    addNewCustomer() {
      this.$store.dispatch('addNewCustomer', this.newCustomer);
    },
    addNewPlanforCustomer() {
      this.activeCustomer.plan_status = true
      this.$store.dispatch('updateCustomerPlan', this.activeCustomer)
      this.showAddPlanPrimeDialog = false;
    },
    updatePlanForCustomer() {
      this.activeCustomer.plan_status = true
      this.$store.dispatch('updateCustomerPlan', this.activeCustomer)
      this.showChangePlanPrimeDialog = false;
    },
    renewPlanForCustomer() {
      this.activeCustomer.plan_status = true
      this.$store.dispatch('updateCustomerPlan', this.activeCustomer)
      this.showPlanRenewimeDialog = false;
      
    }
  },
  data()  {
    return {
      customerListData : [],
      showCustomerRegistrationPrimeDialog: false,
      showPlanRenewimeDialog: false,
      showChangePlanPrimeDialog: false,
      showAddPlanPrimeDialog: false,
      newCustomer : {
        name: null,
        email: null,
        date_of_birth: null,
        aadhar_number: null,
        phone_number: null,
        current_plan: null,
        plan_activation_date: null,
        plan_status: null,
      },
      activeCustomer : {},
      telecomPlans: [
        {name: "Platinum365", code: 1},
        {name: "Gold180", code: 2},
        {name: "Silver90", code: 3}
      ],
      planDict : {
        1: "Platinum365",
        2: "Gold180",
        3: "Silver90"
      }
    }
  },
  computed: {
    customerListDataComputed() {
      return this.$store.state.customerListData
  },
  },
  mounted () {
    this.$store.dispatch('fetchCustomerData');
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

html {
    font-size: 14px;
}

.p-dialog {
  border-radius: 12px !important;
  background-color: green !important
}
   
</style>
