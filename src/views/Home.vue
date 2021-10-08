<template>
  <v-container>
    <v-row>
      <v-col sm="4" md="3">
        <v-card dark class="filters-container">
          <v-container>
            <div class="mb-4">
              <v-text-field
                v-model="name"
                append-icon="mdi-magnifier"
                label="Search character"
                clearable
              ></v-text-field>
            </div>
            <div>
              <div>Status:</div>
              <div class="d-flex flex-wrap">
                <v-chip
                  v-for="status in statusList"
                  :key="status.id"
                  class="mr-1 mb-1"
                  :color="selectedStatus === status.value ? 'green' : ''"
                  outlined
                  @click="
                    selectedStatus === status.value
                      ? (selectedStatus = '')
                      : (selectedStatus = status.value)
                  "
                >
                  {{ status.text }}
                </v-chip>
              </div>
            </div>
            <div>
              <v-select
                v-model="species"
                :items="speciesList"
                label="Species"
                clearable
              ></v-select>
            </div>
            <div>
              <v-select
                v-model="type"
                :items="typesList"
                label="Types"
                clearable
              ></v-select>
            </div>
            <div>
              <div>Gender:</div>
              <div class="d-flex flex-wrap">
                <v-chip
                  v-for="gender in gendersList"
                  :key="gender.id"
                  class="mr-1 mb-1"
                  :color="selectedGender === gender.value ? 'green' : ''"
                  outlined
                  @click="
                    selectedGender === gender.value
                      ? (selectedGender = '')
                      : (selectedGender = gender.value)
                  "
                >
                  {{ gender.text }}
                </v-chip>
              </div>
            </div>
          </v-container>
        </v-card>
      </v-col>

      <v-col sm="8" md="9" class="characters-list">
        <div v-if="total > 0" class="counter mb-4 text-right">
          {{ total }} results
        </div>
        <v-row v-if="error" class="text-center error-message">
          <v-col>
            <h4>{{ error }}</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="character in characters"
            :key="character.id"
            sm="6"
            md="4"
            class="d-flex card-container"
          >
            <Card :character="character" />
          </v-col>
        </v-row>
        <Loader v-if="isLoading" />
        <div v-intersect="infiniteScrolling"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from '@/components/Card.vue'
import Loader from '@/components/Loader'
import { api } from '../api'

export default {
  name: 'Home',
  components: {
    Card,
    Loader
  },

  data() {
    return {
      data: {
        alien: [
          'Alligator-Person',
          'Alphabetrian',
          'Animal',
          'Blue ape alien',
          'Cone-nippled alien',
          'Interdimensional gaseous being',
          'Flansian',
          'Bepisian',
          'Bird-Person',
          'Boobloosian',
          'Cromulon',
          'Cat-Person',
          'Chair',
          'Cyborg',
          'Drumbloxian',
          'Elephant-Person',
          'Floop Floopian',
          'Fly',
          'Garblovian',
          'Gazorpian',
          'Gear-Person',
          'Glorzo',
          'Gramuflackian',
          'Greebybobe',
          'Gromflomite',
          'Hairy alien',
          'Hivemind',
          'Korblock',
          'Krootabulan',
          'Larva alien',
          'Light bulb-Alien',
          'Lizard',
          'Lobster-Alien',
          'Mexican',
          'Monogatron',
          'Nano Alien',
          'Numbericon',
          'Organic gun',
          'Parasite',
          'Plutonian',
          'Pripudlian',
          'Ring-nippled alien',
          'Shapeshifter',
          'Shimshamian',
          'Snail alien',
          'Soulless Puppet',
          'Tentacle alien',
          'Traflorkian',
          'Tuskfish',
          'Unknown-nippled alien',
          'Zigerion',
          'Zombodian'
        ],
        animal: [
          'Cat',
          'Caterpillar',
          'Dog',
          'Doopidoo',
          'Eel',
          'Giant Cat Monster',
          'Rat',
          'Robot-Crocodile hybrid',
          'Scrotian',
          'Sentient ant colony',
          'Snake',
          'Teddy Bear',
          'Shrimp',
          'Soulless Puppet',
          'Wasp'
        ],
        human: [
          '',
          'Genetic exeriment',
          'Human with antennae',
          'Human with ants in his eyes',
          'Human with baby legs',
          'Superhuman'
        ],
        humanoid: [
          'Amoeba-Person',
          'Conjoined twin',
          'Cyborg',
          'Fish-Person',
          'Hammerhead-Person',
          'Human Gazorpian',
          'Lizard-Person',
          'Meeseeks',
          'Mega Gargantuan',
          'Microverse inhabitant',
          'Miniverse inhabitant',
          'Octopus-Person',
          'Robot',
          'The Devil',
          'Tinymouth'
        ],
        'mythological creature': [
          'Boobie buyer reptilian',
          'Centaur',
          'Demon',
          'Giant',
          'Goddess',
          'Jellybean',
          'Leprechaun',
          'Monster',
          'Mytholog',
          'Slug',
          'Stair goblin',
          'Vampire'
        ]
      },
      isLoading: false,
      error: '',
      name: '',
      statusList: [
        { value: 'alive', text: 'Alive' },
        { value: 'dead', text: 'Dead' },
        { value: 'unknown', text: 'Unknown' }
      ],
      typesList: [],
      speciesList: [
        { value: 'alien', text: 'Alien' },
        { value: 'animal', text: 'Animal' },
        { value: 'disease', text: 'Disease' },
        { value: 'human', text: 'Human' },
        { value: 'humanoid', text: 'Humanoid' },
        { value: 'mythological creature', text: 'Mythological creature' },
        { value: 'robot', text: 'Robot' }
      ],
      gendersList: [
        { value: 'female', text: 'Female' },
        { value: 'male', text: 'Male' },
        { value: 'genderless', text: 'Genderless' },
        { value: 'unknown', text: 'Unknown' }
      ],
      selectedStatus: '',
      species: '',
      type: '',
      selectedGender: null,
      page: 1,
      characters: []
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    name: function () {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.resetData()
        this.fetchData()
      }, 300)
    },
    selectedStatus: function () {
      this.resetData()
      this.fetchData()
    },
    species: function () {
      this.resetData()
      if (this.species !== '') {
        this.typesList = this.data[this.species]
      } else {
        const values = Object.values(this.data).reduce((acc, item) => {
          acc.push(...item)
          return acc
        }, [])
        this.typesList = values.sort()
      }
      this.type = ''
      this.fetchData()
    },
    type: function () {
      this.resetData()
      this.fetchData()
    },
    selectedGender: function () {
      this.resetData()
      this.fetchData()
    }
  },
  methods: {
    resetData() {
      this.error = null
      this.page = 1
      this.total = 0
      this.characters = []
    },
    async fetchData() {
      this.isLoading = true
      api
        .getCharacters(this.page, {
          name: this.name,
          status: this.selectedStatus,
          species: this.species,
          type: this.type,
          gender: this.selectedGender
        })
        .then(({ data }) => {
          this.total = data.info.count
          this.characters.push(...data.results)
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          this.error = this.page > 1 ? null : error.response.data.error
        })
    },
    infiniteScrolling() {
      if (!this.isLoading && !this.error) {
        this.page++
        this.fetchData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.counter,
.error-message {
  color: white;
}
.error-message {
  color: white;
  height: 100%;
  display: flex;
  align-content: center;
}
.filters-container {
  background-color: rgba(30, 30, 30, 0.4);
}
.card-container {
  place-content: center;
}
</style>
