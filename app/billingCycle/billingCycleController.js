/*
 * messages = factory mensagemFactory
 * tabs = factory tabsFactory
 */

(function() {
    angular.module('primeiraApp').controller('BillingCycleCtrl', [
        '$http',
        'messages',
        'tabs',
        BillingCycleController
    ])

    function BillingCycleController($http, messages, tabs) {
        const vm = this /* VM = View Model (padrao Jonh Papper) */
        const url = "https://controlefinanceiro-api.herokuapp.com/api/billingCycles"

        /* GET */
        vm.refresh = function() {
            $http.get(url).then(function(response) {
                vm.billingCycle = {}
                vm.billingCycles = response.data
                tabs.show(vm, {tabList: true, tabCreate: true})
            })
        }

        /* POST */
        vm.create = function() {
            $http.post(url, vm.billingCycle).then(function(response) {
                vm.refresh()
                messages.addSuccess('Operação realizada com sucesso!')
            }).catch(function(response) {
                messages.addError(response.data.errors)
            })
        }

        vm.refresh()
    }

})()