
import axios from 'axios';
import {createStore} from 'vuex'

const store = createStore({
    state: {
      customerListData: [],
    },
    mutations: {
      setcustomerListData(state, newCustomerData) {
        state.customerListData = newCustomerData;
      },
      addCustomer(state, newCustomer) {
        state.customerListData.push(newCustomer)
      },
      updateCustomerPlan(state, updatedPlandata) {
        const { id, newPlan, plan_activation_date, plan_status } = updatedPlandata;
        const userToUpdate = state.customerListData.find(user => user.id === id);

        if (userToUpdate) {
            userToUpdate.plan = newPlan;
            userToUpdate.plan_activation_date = plan_activation_date;
            userToUpdate.plan_status = plan_status;
        }

      }
    },
    actions: {
      async fetchCustomerData(context) {
        try {

        const fectCustomerAPIResponse = await axios.get("http://127.0.0.1:8000/tcms-api/customers")
        context.commit('setcustomerListData', fectCustomerAPIResponse.data)
        } catch (error) {
            console.error("Error fetching customers data ", error)
        }
      },

      async addNewCustomer(context, newCustomerData) {
        try {
            const addNewCustomer = await axios.post("http://127.0.0.1:8000/tcms-api/customers/register/", newCustomerData)
            context.commit('addCustomer', addNewCustomer.data)
        } catch (error) {
            console.error("Error adding customers data", error)
        }
      },

      async updateCustomerPlan(context, updatedPlanData) {
        try {
            const newPlanData = await axios.patch("http://127.0.01:8000/tcms-api/customers/" + updatedPlanData.id + "/update-plan/", updatedPlanData)
            context.commit('updateCustomerPlan', newPlanData)
        } catch(error) {
            console.error("Error updating plan data", error)
        }
      }
    },
    getters: {
      getcustomerListData: state => state.customerListData,
    },
  });
  
  export default store;