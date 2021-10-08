<template>
  <div class="flip-container" v-bind:class="{ flipped: isFlipped }">
    <div class="flipper" v-on:click="isFlipped = !isFlipped">
      <v-card class="front" width="250px">
        <v-img
          :src="character.image"
          :alt="character.name"
          max-height="250px"
          max-width="250px"
        ></v-img>

        <v-card-title
          v-resize-text="{ minFontSize: '20px', maxFontSize: '24px' }"
          class="text-center"
        >
          {{ character.name }}
        </v-card-title>

        <v-card-text>
          <div class="text-center">
            {{ character.species }} - {{ character.origin.name }}
          </div>
        </v-card-text>
      </v-card>

      <v-card class="back" width="250px">
        <v-card-text class="d-flex flex-column">
          <v-container class="card-content">
            <h2 class="text-center mt-4 mb-8">{{ character.name }}</h2>

            <div>
              <span class="label">status: </span>
              <span class="value">
                {{ character.status }}
                <v-icon v-if="character.status === 'Dead'" color="red darken-2"
                  >mdi-skull</v-icon
                >
              </span>
            </div>
            <div>
              <span class="label">Species: </span>
              <span class="value">{{ character.species }}</span>
            </div>
            <div v-if="character.type">
              <span class="label">type: </span>
              <span class="value">{{ character.type }}</span>
            </div>
            <div>
              <span class="label">gender: </span>
              <span class="value">{{ character.gender }}</span>
            </div>
            <div>
              <span class="label">Origin: </span>
              <span class="value">{{ character.origin.name }}</span>
            </div>
            <div>
              <span class="label">location: </span>
              <span class="value">{{ character.location.name }}</span>
            </div>
            <div>
              <span class="label"># episodes: </span>
              <span class="value">{{ character.episode.length }}</span>
            </div>
          </v-container>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['character'],

  data: function () {
    return {
      isFlipped: false
    }
  }
}
</script>

<style lang="scss" scoped>
.flip-container {
  cursor: pointer;
  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  -o-perspective: 1000;
  perspective: 1000;
}
.flipper {
  transform: perspective(1000px);
  -moz-transform: perspective(1000px);
  transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  position: relative;
}
.front,
.back {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: 0.6s;
  -webkit-transform-style: preserve-3d;
  -moz-transition: 0.6s;
  -moz-transform-style: preserve-3d;
  -o-transition: 0.6s;
  -o-transform-style: preserve-3d;
  -ms-transition: 0.6s;
  -ms-transform-style: preserve-3d;
  transition: 0.6s;
  transform-style: preserve-3d;
  top: 0;
  left: 0;
  width: 100%;
}
.front {
  z-index: 2;
}
.back {
  height: 100%;
  -webkit-transform: rotateY(-180deg);
  -moz-transform: rotateY(-180deg);
  -o-transform: rotateY(-180deg);
  -ms-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
  position: absolute;
}
.flip-container.flipped .back {
  -webkit-transform: rotateY(0deg);
  -moz-transform: rotateY(0deg);
  -o-transform: rotateY(0deg);
  -ms-transform: rotateY(0deg);
  transform: rotateY(0deg);
}
.flip-container.flipped .front {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  transform: rotateY(180deg);
}
.v-card {
  .v-card__title {
    word-break: break-word;
    place-content: center;
    padding-bottom: 0;
  }

  .v-card__text {
    .card-title {
      text-align: center;
      font-weight: 900;
      margin-bottom: 0.4em;
    }

    .card-content {
      .label {
        color: #a1cc37;
        font-weight: 900;
      }
    }
  }
}
</style>
