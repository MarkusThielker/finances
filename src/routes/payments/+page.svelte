<script lang="ts">

    /**@type {import("./$types").PageData}*/
    export let data

</script>


<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">Payments</h1>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button class="btn-primary" type="button">
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
