<template>
    <form action="#" @submit.prevent="submit">
        <div class="form-group">
            <label for="body" class="sr-only">Share Something</label>
            <textarea
                class="form-control"
                name="body"
                id="body"
                rows="3"
                placeholder="Share Something"
                v-model = "form.body"
            ></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Post it</button>
    </form>
</template>


<script>
    import { mapActions } from 'vuex'

    export default {
        data() {
            return {
                form: {
                    body: ''
                }
            }
        },

        methods: {
            ...mapActions({
                createPost: 'createPost'
            }),

            async submit () {

                await this.createPost(this.form)
                this.form.body = ''
            }
        }
    }
</script>
