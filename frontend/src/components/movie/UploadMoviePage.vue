<template>
    <form method="post" @submit.stop.prevent="mySubmit">
        <div>
            <label for="name">영화 제목</label>
            <input type="text" name="name" required v-model="movie.name">
        </div>
        <div>
            <label for="year">개봉 년도</label>
            <input type="number" name="year" required v-model="movie.year">
        </div>
        <div>
            <label for="director">감독</label>
            <input type="text" name="director" required v-model="movie.director">
        </div>
        <div>
            <label for="poster">포스터 링크</label>
            <input type="url" name="name" required v-model="movie.poster">
        </div>
        <div>
            <label for="description">설명</label>
            <input type="text" name="description" required v-model="movie.description">
        </div>
        <div>
            <button type="submit">업로드</button>
        </div>
    </form>
</template>

<script>
/* eslint-disable */
export default {
    data() {
        return {
            movie: {
                id: "",
                name: "",
                year: 0,
                director: "",
                poster: "",
                description: ""
            },
            response: ""
        };
    },
    methods: {
        mySubmit() {
            this.$http.post("/movies/upload", this.movie)
                .then(res => {
                    console.log('upload success!');
                })
                .catch(err => {
                    console.error('upload fali!');
                });
            // go to list page
            this.$router.push({ name: "movielist" });
        }
    },
    created() {
        // get movies
        this.$http.get(`/movies`).then(response => {
            const movies = response.data;
            this.movie.id = movies.length + 1;
        });
    }
};
</script>

