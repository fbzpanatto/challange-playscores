<template>
  <div id="principal" class="hello columns is-centered">
    <div class="column is-half">
      <div v-if="!token">
        <button class="is-success button is-fullwidth" @click="login">
          Spotify Login
        </button>
      </div>
      <div v-else>
        <br />
        <h1>{{ msg }}</h1>
        <br />
        <div v-if="errorCity">
          <div class="notification is-danger">
            <p>{{ errorCity }}</p>
          </div>
        </div>
        <br />
        <label for="inputMethod">Nome ou Coordenada?</label>
        <select
          v-model="cityChoice"
          class="input"
          name="inputMethod"
          id="inputMethod"
        >
          <option
            class="input"
            :value="choice.id"
            v-for="choice in arrofChoice"
            :key="choice.id"
          >
            {{ choice.choice }}
          </option>
        </select>
        <br /><br />
        <div v-if="cityChoice == 1">
          <input
            type="text"
            class="input"
            placeholder="Nome da cidade"
            v-model="cityName"
          />
        </div>
        <div v-if="cityChoice == 2">
          <input
            type="text"
            class="input"
            placeholder="Latitude"
            v-model="cityLat"
          />
          <br /><br />
          <input
            type="text"
            class="input"
            placeholder="Longitude"
            v-model="cityLon"
          />
        </div>
        <br />
        <button
          v-if="cityChoice"
          class="button is-primary is-fullwidth"
          @click="getCityWheater"
        >
          Encontrar cidade</button
        ><br />
        <div v-if="myWeather && !arrOfPlaylistLinks">
          <button class="button is-success is-fullwidth" @click="findPlaylist">
            Veja o que encontramos para voce hoje.
          </button>
        </div>
        <hr />
        <div v-if="arrOfPlaylistLinks && !errorCity">
          <span>
            city: {{ returnedCityName }}, weather: {{ myWeather }}, lat:
            {{ returnedCitylat }}, lon: {{ returnedCitylon }}
          </span>
          <br /><br />
          <p>Aqui estao algumas opcoes para o seu dia!</p>
          <br />
          <div class="column is-half">
            <table class="table is-striped is-bordered">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nome</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in arrOfPlaylistLinks" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.name }}</td>
                  <td>
                    <a :href="item.external_urls.spotify" target="_blank">
                      {{ item.external_urls.spotify }}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  created() {
    function getHashParams() {
      var hashParams = {};
      var e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
      e = r.exec(q);
      while (e) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
        e = r.exec(q);
      }
      return hashParams;
    }
    const parametros = getHashParams();
    this.token = parametros.access_token;
    this.refresh_token = parametros.refresh_token;
  },
  data() {
    return {
      returnedCityName: "",
      returnedCitylat: "",
      returnedCitylon: "",
      errorCity: "",
      tracks: "",
      cityName: "",
      cityLat: "",
      cityLon: "",
      myWeather: "",
      cityChoice: false,
      token: "",
      refresh_token: "",
      arrOfPlaylistLinks: "",
      arrofChoice: [
        {
          id: 1,
          choice: "Nome",
        },
        {
          id: 2,
          choice: "Coordenada",
        },
      ],
    };
  },
  methods: {
    async login() {
      window.location.href = "http://localhost:8888";
    },
    async findPlaylist() {
      if (!this.errorCity) {
        const config = {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        };
        if (this.myWeather > 32) {
          this.tracks = "party";
        }
        if (this.myWeather > 22 && this.myWeather < 32) {
          this.tracks = "pop";
        }
        if (this.myWeather > 10 && this.myWeather < 22) {
          this.tracks = "rock";
        }
        if (this.myWeather < 10) {
          this.tracks = "classical";
        }
        const tracks = this.tracks;
        const result = await axios.get(
          `https://api.spotify.com/v1/browse/categories/${tracks}/playlists`,
          config
        );
        this.arrOfPlaylistLinks = result.data.playlists.items;
      }
    },
    async getCityWheater() {
      this.arrOfPlaylistLinks = "";
      this.errorCity = "";
      this.myWeather = "";

      if (this.cityChoice == 1) {
        try {
          const city = this.cityName;
          const result = await axios.get(
            `http://localhost:8888/weather/?city=${city}`
          );
          if (!result.data.error) {
            if (result.data) {
              this.returnedCityName = result.data.city;
              this.returnedCitylat = result.data.coord.lat;
              this.returnedCitylon = result.data.coord.lon;
              this.myWeather = result.data.wheater;
            } else {
              this.errorCity = "cidade nao encontrada";
            }
          } else {
            this.errorCity = result.data.error;
          }
        } catch (err) {
          console.log(err);
        }
      }
      if (this.cityChoice == 2) {
        try {
          const result = await axios.get(
            `http://localhost:8888/weather/?lat=${this.cityLat}&lon=${this.cityLon}`
          );
          if (!result.data.error) {
            if (result.data) {
              this.returnedCityName = result.data.city;
              this.returnedCitylat = result.data.coord.lat;
              this.returnedCitylon = result.data.coord.lon;
              this.myWeather = result.data.wheater;
            } else {
              this.errorCity = "cidade nao encontrada";
            }
          } else {
            this.errorCity = result.data.error;
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#principal {
  background-color: #d3d3d3;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
