<script lang="ts">

    import { enhance } from "$app/forms"
    import { SIGNUP_URL } from "$lib/constants"

    export let form

</script>


<svelte:head>
    <title>Login | Finances</title>
</svelte:head>


<div class="flex items-center justify-center">

    <div class="card flex flex-col max-w-md w-full space-y-4 ">

        <h1 class="text-xl text-center font-semibold">Sign into your account</h1>

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
                <div class="py-1 bg-red-500/50 shape-rounded text-white text-center">{form.error.general}</div>
            {/if}

            <input class="btn-primary" type="submit" value="Login"/>
        </form>
        <a class="btn-text-primary" href={SIGNUP_URL}>No account yet? Create one here!</a>
    </div>

</div>
