<script lang="ts">

    import { fade } from "svelte/transition"
    import MoneyInput from "$lib/components/MoneyInput.svelte"
    import type { Payment } from "@prisma/client"
    import Autocomplete from "$lib/components/Autocomplete.svelte"

    /**@type {import("./$types").PageData}*/
    export let data

    let dialogVisible = false
    let isEdit = false

    let paymentId = -1

    let amount = 0
    let note = ""

    let date = new Date()
    let dateString = date.toISOString().split("T")[0]

    let payors = data?.entities
    let payor = payors[0]?.id

    let payees = data?.entities
    let payee = payees[1]?.id

    let categories = data?.categories
    let category = categories[0]?.id

    function openDialog(payment?: Payment) {

        if (payment) {
            paymentId = payment.id
            amount = Number(payment.amount) / 100
            date = payment.date
            dateString = payment.date.toISOString().split("T")[0]
            payor = payment.payorId
            payee = payment.payeeId
            category = payment.categoryId
            note = payment.note ?? ""
            isEdit = true
        } else {
            paymentId = -1
            amount = 0
            date = new Date()
            dateString = date.toISOString().split("T")[0]
            payor = null
            payee = null
            category = null
            note = ""
            isEdit = false
        }

        dialogVisible = true
    }

    function getMonthName(monthNumber) {
        const date = new Date()
        date.setMonth(monthNumber)
        return date.toLocaleString("en-US", {month: "long"})
    }

</script>


<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900 dark:text-white">Payments</h1>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button class="btn-primary" on:click={() => {
                    isEdit = false
                    openDialog()
                }}
                type="button">
            Create Payment
        </button>
    </div>
</div>

<div class="flow-root">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                    <thead class="bg-gray-50">
                    <tr>
                        <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6" scope="col">
                            ID
                        </th>
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Date</th>
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Amount</th>
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Payor</th>
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Payee</th>
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Category</th>
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Note</th>
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col"></th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                    {#each [...data.paymentsGrouped] as [year, paymentsInYear]}

                        {#each [...paymentsInYear] as [month, paymentsInMonth]}

                            {#each paymentsInMonth as payment}
                                <tr>
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{payment.id}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{payment.date.toLocaleDateString()}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {
                                            new Intl.NumberFormat("de-DE", {
                                                style: "currency",
                                                currency: payment.currency
                                            }).format(Number(payment.amount) / 100)
                                        }
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{payment.payor?.name}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{payment.payee?.name}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 inline-flex">
                                        <svg class="h-5 mr-2" fill={payment.category?.color} viewBox="0 0 20 20"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="10" cy="10" r="10"/>
                                        </svg>
                                        {payment.category?.name}
                                    </td>
                                    <td class="px-3 py-4 text-sm text-gray-500 max-w-sm">{payment.note ?? ""}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 inline-flex space-x-8">

                                        <button class="btn-text-primary" on:click={() => openDialog(payment)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                                            </svg>
                                        </button>

                                        <form method="POST" action="?/remove">
                                            <input type="hidden" id="id" name="id" value={payment.id}>
                                            <button type="submit" class="btn-text-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                                </svg>
                                            </button>
                                        </form>

                                    </td>
                                </tr>
                            {/each}

                            <tr>
                                <td class="bg-gray-200 px-16 py-2 font-semibold text-gray-500" colspan="10">All
                                    transactions of {getMonthName(month)} {year}</td>
                            </tr>

                        {/each}
                    {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

{#if dialogVisible}

    <div class="fixed inset-0 bg-gray-500 dark:bg-neutral-900/80 bg-opacity-75 transition-opacity"
         transition:fade={{duration: 100}}></div>

    <div class="fixed inset-0 z-10 overflow-y-auto" transition:fade={{duration: 100}}>
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <form method="POST" action="{ isEdit ? '?/update' : '?/create'}"
                  class="relative transform overflow-hidden rounded-lg bg-white dark:bg-neutral-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-3xl sm:p-6">

                <h1 class="text-2xl font-semibold leading-6 mb-4">{ isEdit
                    ? "Update Payment"
                    : "Create Payment"}</h1>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">

                    <input type="hidden" name="id" value={paymentId}/>

                    <MoneyInput bind:value={amount} name="amount" required="true"/>

                    <div>
                        <label for="date">Date</label>
                        <input class="input-text w-full" id="date" name="date" type="date"
                               bind:value={dateString}
                               on:change={(event) => {
                                   event.preventDefault()
                                   date = new Date(event.target.value)
                                   dateString = date.toISOString().split("T")[0]
                               }}
                               required
                        />
                    </div>

                    <Autocomplete name="payor" label="Payor" bind:value={payor} options={payors}/>

                    <Autocomplete name="payee" label="Payee" bind:value={payee} options={payees}/>

                    <Autocomplete name="category" label="Category" bind:value={category} options={categories}/>

                    <div class="flex flex-col w-full sm:col-span-2">
                        <label for="note">Note</label>
                        <textarea id="note" name="note" bind:value={note}
                                  class="input-text-area"></textarea>
                    </div>

                </div>

                <div class="mt-5 sm:mt-6 grid grid-flow-row-dense grid-cols-2 gap-3">
                    <button type="button"
                            class="btn-text-primary"
                            on:click={() => dialogVisible = !dialogVisible}>Cancel
                    </button>
                    <button type="submit"
                            class="btn-primary"
                            on:click={() => dialogVisible = !dialogVisible}>{ isEdit ? "Update" : "Create"}
                    </button>
                </div>
            </form>
        </div>
    </div>
{/if}
