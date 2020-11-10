<template>
  <div class="flip-container" v-bind:class="{ flipped: isFlipped }">
    <div class="flipper" v-on:click="isFlipped = !isFlipped">
      <v-card class="front">
        <v-img
          :src="character.image"
          :alt="character.name"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.4)"
        >
          <span class="card-number" outlined>{{ character.id }}</span>
          <v-card-title
            v-text="character.name"
            v-resize-text="{ minFontSize: '42px' }"
          ></v-card-title>
        </v-img>
      </v-card>

      <v-card class="back">
        <v-card-text class="d-flex flex-column">
          <div class="card-title" v-resize-text="{ minFontSize: '35px' }">
            {{ character.name }}
          </div>
          <v-container
            class="card-content"
            v-resize-text="{ ratio: 2, minFontSize: '24px' }"
          >
            <v-row class="flex-nowrap align-center">
              <span class="label flex-grow-1">Status: </span>
              <span class="value text-right">
                {{ character.status }}
                <v-icon
                  v-if="character.status === 'Dead'"
                  class="mb-2"
                  color="red darken-2"
                  >mdi-skull</v-icon
                >
              </span>
            </v-row>
            <v-row class="flex-nowrap">
              <span class="label flex-grow-1">Species: </span>
              <span class="value text-right">{{ character.species }}</span>
            </v-row>
            <v-row v-if="character.type" class="flex-nowrap">
              <span class="label flex-grow-1">Type: </span>
              <span class="value text-right">{{ character.type }}</span>
            </v-row>
            <v-row class="flex-nowrap align-center">
              <span class="label flex-grow-1">Gender: </span>
              <span class="value text-right"
                >{{ character.gender
                }}<v-icon
                  v-if="character.gender === 'Male'"
                  class="mb-2"
                  color="blue lighten-2"
                  >mdi-gender-male</v-icon
                ><v-icon
                  v-if="character.gender === 'Female'"
                  class="mb-2"
                  color="pink lighten-2"
                  >mdi-gender-female</v-icon
                ></span
              >
            </v-row>
            <v-row class="flex-nowrap">
              <span class="label flex-grow-1">Origin: </span>
              <span class="value text-right">{{ character.origin.name }}</span>
            </v-row>
            <v-row class="flex-nowrap">
              <span class="label flex-grow-1">Location: </span>
              <span class="value text-right">{{
                character.location.name
              }}</span>
            </v-row>
            <v-row class="d-flex">
              <span class="label flex-grow-1"># episodes: </span>
              <span class="value text-right">{{
                character.episode.length
              }}</span>
            </v-row>
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
  padding: 8px;

  .card-number {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px 12px;
    font-weight: 900;
    font-size: 20px;
  }

  .v-card__title {
    padding: 0.4em 0.6em;
    word-break: break-word;
  }

  .v-card__text {
    height: 100%;
    overflow: hidden;

    .v-image {
      border-radius: 14px !important;
      border-radius: 1px solid #444 !important;
    }

    .card-title {
      text-align: center;
      font-weight: 900;
      margin-bottom: 0.4em;
    }

    .card-content {
      max-height: 90%;
      overflow-y: auto;
      overflow-x: hidden;
      margin: auto 0;
      padding-right: 24px;

      .row {
        margin-bottom: 0.3em;

        .label {
          color: #a1cc37;
          font-weight: 900;
        }
      }
    }
  }
}
</style>
