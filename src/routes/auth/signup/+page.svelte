<script lang="ts">

    import { enhance } from "$app/forms"
    import { LOGIN_URL } from "$lib/constants"

    export let form

</script>


<svelte:head>
    <title>Sign-Up | Finances</title>
</svelte:head>


<div class="flex items-center justify-center">

    <div class="card flex flex-col max-w-md w-full space-y-4 ">

        <h1 class="text-xl text-center font-semibold">Create your account</h1>

        <form class="flex flex-col space-y-2" method="POST" use:enhance>
            <div class="flex flex-col">
                <label for="username">Username</label>
                <input class="input-text" id="username" name="username" required/>
                {#if form?.error?.username}
                    <div class="text-red-500">{form.error.username}</div>
                {/if}
            </div>
            <div class="flex flex-col">
                <label for="password">Password</label>
                <input class="input-text" id="password" name="password" required type="password"/>
                {#if form?.error?.password}
                    <div class="text-red-500">{form.error.password}</div>
                {/if}
            </div>

            {#if form?.error?.general}
                <div class="bg-red-500/50 shape-rounded text-red-500 text-center">{form.error.general}</div>
            {/if}

            <input class="btn-primary" type="submit" value="Create account"/>
        </form>
        <a class="btn-text-primary" href={LOGIN_URL}>Already got an account? Login here!</a>
    </div>

</div>
