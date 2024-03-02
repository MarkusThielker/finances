<script lang="ts">

    import { enhance } from "$app/forms"
    import type { PageData } from "./$types"
    import { dev } from "$app/environment";
    import * as Card from "$lib/components/ui/card"
    import * as Form from "$lib/components/ui/form"

    export let data: PageData

</script>


<svelte:head>
    <title>Account | Finances</title>
</svelte:head>


<div class="flex items-center justify-center">

    <Card.Root class="w-[450px]">
        <Card.Header>
            <Card.Title>Welcome back, {data.user.username}!</Card.Title>
        </Card.Header>
        <Card.Content class="space-y-2">
            <div>
                <p>
                    <span class="font-semibold">User id:</span>
                    {data.user.userId}
                </p>
                <p>
                    <span class="font-semibold">Username:</span>
                    {data.user.username}
                </p>
            </div>

            <div>
                <p>
                    <span class="font-semibold">Payments:</span>
                    {data.payments}
                </p>
                <p>
                    <span class="font-semibold">Entities:</span>
                    {data.entities}
                </p>
                <p>
                    <span class="font-semibold">Categories:</span>
                    {data.categories}
                </p>
            </div>

            {#if dev}
                <form action="?/createSampleDate" class="flex flex-col" method="POST" use:enhance>
                    <Form.Button class="btn-primary" type="submit">
                        Create Sample Data
                    </Form.Button>
                </form>
            {/if}

            <form action="?/logout" class="flex flex-col" method="POST" use:enhance>
                <Form.Button class="btn-primary" type="submit">
                    Logout
                </Form.Button>
            </form>

        </Card.Content>

    </Card.Root>
</div>
