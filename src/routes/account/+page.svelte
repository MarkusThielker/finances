<script lang="ts">

    import { enhance } from "$app/forms"
    import type { PageData } from "./$types"
    import { dev } from "$app/environment";

    export let data: PageData

</script>


<svelte:head>
    <title>Account | Finances</title>
</svelte:head>


<div class="flex items-center justify-center">

    <div class="card flex flex-col max-w-md w-full space-y-6">

        <h1 class="text-xl text-center font-semibold">Welcome back, {data.user.username}!</h1>

        <div>
            <p>User id: {data.user.userId}</p>
            <p>Username: {data.user.username}</p>
        </div>

        <div>
            <p>Payments: {data.payments}</p>
            <p>Entities: {data.entities}</p>
            <p>Categories: {data.categories}</p>
        </div>

        <div class="space-y-2">

            {#if dev}
                <form action="?/createSampleDate" class="flex flex-col" method="POST" use:enhance>
                    <input class="btn-primary" type="submit" value="Create Sample Data"/>
                </form>
            {/if}

            <form action="?/logout" class="flex flex-col" method="POST" use:enhance>
                <input class="btn-primary" type="submit" value="Logout"/>
            </form>

        </div>

    </div>

</div>
