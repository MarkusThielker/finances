<script lang="ts">

    import { fade } from "svelte/transition"
    import MoneyInput from "$lib/components/MoneyInput.svelte"

    /**@type {import("./$types").PageData}*/
    export let data

    let dialogVisible = false

    let amount = 0
    let date = new Date()

    let payors = data.entities
    let payor = payors[0].id

    let payees = data.entities
    let payee = payees[1].id

    let categories = data.categories
    let category = categories[0].id

    $: console.log(amount)

</script>


<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">Payments</h1>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button class="btn-primary" on:click={() => dialogVisible = !dialogVisible} type="button">
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
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Created</th>
                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">Updated</th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">

                    {#each data.payments as payment}
                        <tr>
                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{payment.id}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{payment.date.toLocaleString()}</td>
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
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 inline-flex items-center">
                                <svg class="h-5 mr-2" fill={payment.category?.color} viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="10" r="10"/>
                                </svg>
                                {payment.category?.name}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{payment.createdAt.toLocaleString()}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{payment.updatedAt.toLocaleString()}</td>
                        </tr>
                    {/each}

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

{#if dialogVisible}

    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" transition:fade={{duration: 100}}></div>

    <div class="fixed inset-0 z-10 overflow-y-auto" transition:fade={{duration: 100}}>
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <form
                    method="POST" action="?/create"
                    class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">

                <h1 class="text-2xl font-semibold leading-6 text-gray-900 mb-4">Create Payment</h1>

                <div class="flex flex-col space-y-2">

                    <div class="flex flex-row space-x-2">

                        <div class="flex flex-col w-full">
                            <MoneyInput bind:value={amount} name="amount" required="true"/>
                        </div>

                        <div class="flex flex-col w-full">
                            <label for="date">Date</label>
                            <input class="input-text" id="date" name="date" type="date" bind:value={date} required/>
                        </div>

                    </div>

                    <div class="flex flex-row space-x-2">

                        <div class="flex flex-col w-full">
                            <label for="payor">Payor</label>
                            <select id="payor" name="payor" bind:value={payor} class="input-text w-full bg-white" required>
                                {#each payors as payor}
                                    <option value={payor.id}>{payor.name}</option>
                                {/each}
                            </select>
                        </div>

                        <div class="flex flex-col w-full">
                            <label for="payee">Payee</label>
                            <select id="payee" name="payee" bind:value={payee} class="input-text bg-white" required>
                                {#each payees as payee}
                                    <option value={payee.id}>{payee.name}</option>
                                {/each}
                            </select>
                        </div>

                    </div>


                    <div class="flex flex-row space-x-2">

                        <div class="flex flex-col w-full">
                            <label for="category">Category</label>
                            <select id="category" name="category" bind:value={category}
                                    class="input-text w-full bg-white" required>
                                {#each categories as category}
                                    <option value={category.id}>{category.name}</option>
                                {/each}
                            </select>
                        </div>

                    </div>

                </div>
                <div class="mt-5 sm:mt-6 grid grid-flow-row-dense grid-cols-2 gap-3">
                    <button type="button"
                            class="btn-text-primary"
                            on:click={() => dialogVisible = !dialogVisible}>Cancel
                    </button>
                    <button type="submit"
                            class="btn-primary"
                            on:click={() => dialogVisible = !dialogVisible}>Create
                    </button>
                </div>
            </form>
        </div>
    </div>
{/if}
