import axios from 'axios'
import { graphql } from '~/config'
import * as types from '../mutation-types'

/**
 * Initial state
 */
export const state = {
  receipt: null,
  receipts: [],
  appointments: [],
  autoincrement: 0, 
  appinc: 0, 
}

/**
 * Mutations
 */
export const mutations = {
  [types.SET_RECEIPT](state, { receipt }) { 
    state.receipt = receipt
  },
  [types.FILL_RECEIPTS](state, { receipts }) { 
 
    state.receipts = receipts
  },

  [types.ADD_RECEIPT](state, { receipt }) { 

           const index = state.receipts.findIndex(r => r.reference === receipt.reference)
           if(index > -1) {
               state.receipts[index] = receipt
           } else {

              state.autoincrement += 1      
              state.receipts.push(receipt)
           }


  },
  [types.FETCH_RECEIPT_FAILURE](state) {
   
  },
}

/**
 * Actions
 */
export const actions = {
  async fetchReceipts({ commit }) {
    try {
      // const { data } = await axios.get(graphql.path('query'), {params: { query: '{accounts(type:"receipt"){ id, name, properties{email, mobile}}}'}})

      commit(types.FILL_RECEIPTS, data.data )
   
    } catch (e) {
      commit(types.FETCH_RECEIPT_FAILURE)
    }
  },

  async addReceipt({ commit, getters, rootState }, receipt) {
    try {

       
       
       if(!receipt.status && receipt.type == 'receipt') {
          let number = '00000' + (getters['autoincrement'] + 1)
          number =  number.substr(number.length - 6)
          receipt.reference = receipt.reference + number
       }

       const {reference, account_id, terminal_id, type, teller, date,discount,discount_amount, tax_total, service_charge, rounding, charge,received, change, note,  refund, items, payments} = receipt

        let castItems = "" 
        let castComm = "" 
        for(const [line, item] of items.entries() ) {
    
           const item_id = item.id
           const commission = item.commission.properties
           const comm_id = item.commission.id
        
           const user_id = item.saleBy.id  
           const qty = item.qty  
           const terminal_id = item.saleBy.id  
           const tax_id = item.tax.id
           const tax_amount = item.tax_amount
           const total_amount = item.amount
           const note = item.note
            
           const discount_amount = item.discount.amount
    

           /* if(type=='receipt') {
                 const comm_ammount = commission.type == 'fix' ? parseFloat(commission.rate) : parseFloat(total_amount) * (parseFloat(commission.rate) /100)
                const comm = `{line: ${line + 1}, 
                               type: "commission", 
                               item_id: ${comm_id},
                               discount: "{}", 
                               discount_amount:0.00, 
                               tax_id: 1, 
                               qty: 1,
                               refund_qty: 0.00,
                               refund_amount: 0.00,
                               tax_amount: 0.00, 
                               user_id: ${user_id},
                               total_amount: ${parseFloat(comm_ammount)}, 
                               note: ""},`   
                 castComm  += comm
            } */  

           const shareWith = 0
           if(item.shareWith) {
              shareWith = item.shareWith.id
           }

           let servicesBy = `` 
         
           if(item.servicesBy && item.properties.contain) {
         
               for(const subitem of item.properties.contain) {
    
                    if(item.servicesBy[subitem]) {
                        if(servicesBy !== '') servicesBy += ','
                        servicesBy +=  `\\"${subitem}\\" : ${item.servicesBy[subitem].id}`

                    }
               }
           } 

           const props = `{\\"shareWith\\":${shareWith},\\"servicesBy\\":{${servicesBy}}}`
     
           
      
              
           const cast = `{line: ${line + 1}, 
                         type: "item", 
                         item_id: ${item_id},
                         discount: "${JSON.stringify(item.discount).replace(/"/g, '\\"')}", 
                         discount_amount: ${parseFloat(discount_amount)}, 
                         tax_id: ${tax_id}, 
                         qty: -${qty},
                         refund_qty: 0.00,
                         refund_amount: 0.00,
                         tax_amount: ${parseFloat(tax_amount)}, 
                         user_id: ${user_id},
                         total_amount: ${parseFloat(total_amount)}, 
                         note: "${note}",
                         properties:"${props}"
                         },`


           castItems += cast



        }
    
        let castPayments = "" 


        if(type=='receipt' && payments) {
 
              for(const [line, payment] of payments.entries() ) {
               
                 const {item_id, total_amount, note} = payment
                 const cast = `{line: ${line + 1}, 
                               type: "payment", 
                               item_id: ${item_id},
                               discount: "{}", 
                               discount_amount:0.00
                               qty: 1,
                               refund_qty: 0.00,
                               refund_amount: 0.00,
                               tax_id: 1, 
                               tax_amount: 0.00, 
                               user_id: ${teller.id},
                               total_amount: ${parseFloat(total_amount)}, 
                               note: "${note}"}, `
                 castPayments +=  cast
                   
              }

        }

   
           
        const mutation = `{
                             newReceipt(
                                 reference: "${reference}",
                                 status: "active",
                                 type: "${type}",
                                 terminal_id: ${terminal_id},
                                 account_id: "${account_id}",
                                 transact_by: ${teller.id},
                                 date: "${date}",
                                 discount: "${JSON.stringify(discount).replace(/"/g, '\\"')}",
                                 discount_amount: ${parseFloat(discount_amount)},
                                 tax_amount: ${parseFloat(tax_total)},
                                 service_charge: ${parseFloat(service_charge)},
                                 rounding: ${parseFloat(rounding)},
                                 charge: ${parseFloat(charge)},
                                 received: ${parseFloat(received)},
                                 change: ${parseFloat(change)},
                                 refund: ${parseFloat(refund)},
                                 note: "${note}",
                                 items: [${castItems}],
                                 payments: [${castPayments}],
                                 commissions: [],
                             ) {id}}`



       
       let isOffline = rootState.system.offline


       if(!isOffline) {
         
         const { data }  = await axios.get(graphql.path('query'), {params: { query: 'mutation receipts' + mutation.replace(/[,]\s+/g, ',') }})
         receipt.id = data.data.newReceipt.id
         receipt.status = 'active'
       } else {
          receipt.status = 'offline'
       }

       commit(types.ADD_RECEIPT, { receipt })
       return receipt
      
    }catch (e) {
       console.log(e)

       receipt.status = 'offline'
       commit(types.ADD_RECEIPT, { receipt })
       return receipt
    }

  },
}

/**
 * Getters
 */
export const getters = {
  receipts: state => state.receipts.sort((a,b) => { return new Date(b.date) - new Date(a.date) }),
  appointments: state => state.appointments,
  receipt: state => state.receipt !== null,
  autoincrement: state => state.autoincrement,
  
}
