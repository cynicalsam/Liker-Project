<template>
    <div>
        <span class="text-secondary">
          {{ pluralize('like', post.likes , true) }} from {{ pluralize('person', post.likers.data.length, true) }}

            <template v-if="post.user.data.liked">
                (including you)
            </template>

        </span>
        <ul class="list-inline mb-0">
            <template v-if="canLike">
                <li class="list-inline-item">
                    <a href="#" @click.prevent="like">Like It</a>
                </li>
            </template>
        </ul>
    </div>
</template>


<script>
    import { mapActions} from 'vuex'
    import pluralize from 'pluralize'
    export default {
        props: {
            post:{
                required: true,
                type: Object
            }
        },

        computed: {
            canLike () {
                if (this.post.user.data.owner) {
                    return false
                }

                if (this.post.user.data.likes_remaining <= 0) {
                    return false
                }

                return true
            }
        },
        methods: {
            pluralize,

            ...mapActions({
               likePost: 'likePost'
            }),

            like () {
                this.likePost(this.post.id)
            }

    }

    }
</script>
