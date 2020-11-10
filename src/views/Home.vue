<template>
  <v-container>
    <v-row>
      <v-col sm="4" md="3">
        <v-card dark class="filters-container">
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="name"
                  append-icon="mdi-magnifier"
                  label="Search character"
                  clearable
                  filled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div>Status:</div>
                <v-chip
                  class="mr-1 mb-1"
                  :color="status === 'alive' ? 'green' : ''"
                  label
                  outlined
                  @click="
                    status === 'alive' ? (status = '') : (status = 'alive')
                  "
                >
                  Alive
                </v-chip>
                <v-chip
                  class="mr-1"
                  :color="status === 'dead' ? 'green' : ''"
                  label
                  outlined
                  @click="status === 'dead' ? (status = '') : (status = 'dead')"
                >
                  Dead
                </v-chip>
                <v-chip
                  :color="status === 'unknown' ? 'green' : ''"
                  label
                  outlined
                  @click="
                    status === 'unknown' ? (status = '') : (status = 'unknown')
                  "
                >
                  Unknown
                </v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  v-model="species"
                  :items="speciesList"
                  label="Species"
                  filled
                  clearable
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  v-model="type"
                  :items="typesList"
                  label="Types"
                  filled
                  clearable
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div>Gender:</div>
                <v-chip
                  class="mr-1 mb-1"
                  :color="gender === 'female' ? 'green' : ''"
                  label
                  outlined
                  @click="
                    gender === 'female' ? (gender = '') : (gender = 'female')
                  "
                >
                  Female
                </v-chip>
                <v-chip
                  class="mr-1"
                  :color="gender === 'male' ? 'green' : ''"
                  label
                  outlined
                  @click="gender === 'male' ? (gender = '') : (gender = 'male')"
                >
                  Male
                </v-chip>
                <v-chip
                  class="mr-1"
                  :color="gender === 'genderless' ? 'green' : ''"
                  label
                  outlined
                  @click="
                    gender === 'genderless'
                      ? (gender = '')
                      : (gender = 'genderless')
                  "
                >
                  Genderless
                </v-chip>
                <v-chip
                  :color="gender === 'unknown' ? 'green' : ''"
                  label
                  outlined
                  @click="
                    gender === 'unknown' ? (gender = '') : (gender = 'unknown')
                  "
                >
                  Unknown
                </v-chip>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>

      <v-col sm="8" md="9" class="characters-list">
        <div v-if="total > 0" class="counter text-right">
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
      status: '',
      speciesList: [
        { value: 'alien', text: 'Alien' },
        { value: 'animal', text: 'Animal' },
        { value: 'disease', text: 'Disease' },
        { value: 'human', text: 'Human' },
        { value: 'humanoid', text: 'Humanoid' },
        { value: 'mythological creature', text: 'Mythological creature' },
        { value: 'robot', text: 'Robot' }
      ],
      species: '',
      typesList: [],
      type: '',
      gender: null,
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
    status: function () {
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
    gender: function () {
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
          status: this.status,
          species: this.species,
          type: this.type,
          gender: this.gender
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
  font-size: 1.5em;
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
.characters-list {
  height: 68vh;
}
</style>
