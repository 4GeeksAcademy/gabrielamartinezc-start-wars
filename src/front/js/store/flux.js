const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      people: [], // Add an array to store the people data
      planets: [], // Add an array to store the planets data
      vehicles: [], // Add an array to store the vehicles data
      favorites: [], // Add an array to store the favourites data
      contacts: [],
    },
    actions: {
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      changeColor: (index, color) => {
        const store = getStore();

        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        setStore({ demo: demo });
      },

      addFavorite: (item) => {
        const store = getStore();
        const newFavorite = { itemType: item.itemType, name: item.name };
        const updatedFavorites = [...store.favorites, newFavorite];
        setStore({ favorites: updatedFavorites });
      },

      removeFavorite: (item) => {
        const store = getStore();
        const updatedFavorites = store.favorites.filter(
          (favorite) =>
            favorite.name !== item.name || favorite.itemType !== item.itemType
        );
        setStore({ favorites: updatedFavorites });
      },

      // Add a function to fetch all people data from the API
      fetchPeople: async () => {
        try {
          let allPeople = [];
          let page = 1;
          const maxResults = 30;

          while (allPeople.length < maxResults) {
            const response = await fetch(
              `https://swapi.dev/api/people/?page=${page}`
            );
            const data = await response.json();

            // Add results to allPeople, but only up to maxResults
            allPeople = allPeople.concat(data.results);

            // Check if we have reached the maximum number of results
            if (allPeople.length >= maxResults) {
              allPeople = allPeople.slice(0, maxResults); // Trim to maxResults if exceeded
              break;
            }

            // Move to the next page
            if (data.next) {
              page += 1;
            } else {
              break;
            }
          }

          // Define a map for person names to image sources
          const imageMap = {
            "Luke Skywalker":
              "https://starwars-visualguide.com/assets/img/characters/1.jpg",
            "C-3PO":
              "https://starwars-visualguide.com/assets/img/characters/2.jpg",
            "R2-D2":
              "https://starwars-visualguide.com/assets/img/characters/3.jpg",
            "Darth Vader":
              "https://starwars-visualguide.com/assets/img/characters/4.jpg",
            "Leia Organa":
              "https://starwars-visualguide.com/assets/img/characters/5.jpg",
            "Owen Lars":
              "https://starwars-visualguide.com/assets/img/characters/6.jpg",
            "Beru Whitesun lars":
              "https://starwars-visualguide.com/assets/img/characters/7.jpg",
            "R5-D4":
              "https://starwars-visualguide.com/assets/img/characters/8.jpg",
            "Biggs Darklighter":
              "https://starwars-visualguide.com/assets/img/characters/9.jpg",
            "Obi-Wan Kenobi":
              "https://starwars-visualguide.com/assets/img/characters/10.jpg",
            "Anakin Skywalker":
              "https://starwars-visualguide.com/assets/img/characters/11.jpg",
            "Wilhuff Tarkin":
              "https://starwars-visualguide.com/assets/img/characters/12.jpg",
            Chewbacca:
              "https://starwars-visualguide.com/assets/img/characters/13.jpg",
            "Han Solo":
              "https://starwars-visualguide.com/assets/img/characters/14.jpg",
            Greedo:
              "https://starwars-visualguide.com/assets/img/characters/15.jpg",
            "Jabba Desilijic Tiure":
              "https://starwars-visualguide.com/assets/img/characters/16.jpg",
            "Wedge Antilles":
              "https://starwars-visualguide.com/assets/img/characters/18.jpg",
            "Jek Tono Porkins":
              "https://starwars-visualguide.com/assets/img/characters/19.jpg",
            Yoda: "https://starwars-visualguide.com/assets/img/characters/20.jpg",
            Palpatine:
              "https://starwars-visualguide.com/assets/img/characters/21.jpg",
            "Boba Fett":
              "https://starwars-visualguide.com/assets/img/characters/22.jpg",
            "IG-88":
              "https://starwars-visualguide.com/assets/img/characters/23.jpg",
            Bossk:
              "https://starwars-visualguide.com/assets/img/characters/24.jpg",
            "Lando Calrissian":
              "https://starwars-visualguide.com/assets/img/characters/25.jpg",
            Lobot:
              "https://starwars-visualguide.com/assets/img/characters/26.jpg",
            Ackbar:
              "https://starwars-visualguide.com/assets/img/characters/27.jpg",
            "Mon Mothma":
              "https://starwars-visualguide.com/assets/img/characters/28.jpg",
            "Arvel Crynyd":
              "https://starwars-visualguide.com/assets/img/characters/29.jpg",
            "Wicket Systri Warrick":
              "https://starwars-visualguide.com/assets/img/characters/30.jpg",
            "Nien Nunb":
              "https://starwars-visualguide.com/assets/img/characters/31.jpg",
            "Qui-Gon Jinn":
              "https://starwars-visualguide.com/assets/img/characters/32.jpg",
            "Nute Gunray":
              "https://starwars-visualguide.com/assets/img/characters/33.jpg",
            "Finis Valorum":
              "https://starwars-visualguide.com/assets/img/characters/34.jpg",
            "Padmé Amidala":
              "https://starwars-visualguide.com/assets/img/characters/35.jpg",
            "Jar Jar Binks":
              "https://starwars-visualguide.com/assets/img/characters/36.jpg",
            "Roos Tarpals":
              "https://starwars-visualguide.com/assets/img/characters/37.jpg",
            "Rugor Nass":
              "https://starwars-visualguide.com/assets/img/characters/38.jpg",
            "Ric Olié":
              "https://starwars-visualguide.com/assets/img/characters/39.jpg",
          };

          // Set image for each person based on the imageMap
          allPeople = allPeople.map((person) => {
            return {
              ...person,
              imgSource:
                imageMap[person.name] || "https://via.placeholder.com/150", // Default image if not found
            };
          });

          setStore({ people: allPeople });
        } catch (error) {
          console.error("Error fetching people data", error);
        }
      },

      // Add a function to fetch all planets data from the API
      fetchPlanets: async () => {
        try {
          let allPlanets = [];
          let page = 1;
          const maxResults = 10;

          while (allPlanets.length < maxResults) {
            const response = await fetch(
              `https://swapi.dev/api/planets/?page=${page}`
            );
            const data = await response.json();

            // Add results to allPlanets, but only up to maxResults
            allPlanets = allPlanets.concat(data.results);

            // Check if we have reached the maximum number of results
            if (allPlanets.length >= maxResults) {
              allPlanets = allPlanets.slice(0, maxResults); // Trim to maxResults if exceeded
              break;
            }

            if (data.next) {
              page += 1;
            } else {
              break;
            }
          }

          // Define a map for planet names to image sources
          const planetImageMap = {
            Tatooine:
              "https://starwars-visualguide.com/assets/img/placeholder.jpg",
            Alderaan:
              "https://starwars-visualguide.com/assets/img/planets/2.jpg",
            "Yavin IV":
              "https://starwars-visualguide.com/assets/img/planets/3.jpg",
            Hoth: "https://starwars-visualguide.com/assets/img/planets/4.jpg",
            Dagobah:
              "https://starwars-visualguide.com/assets/img/planets/5.jpg",
            Bespin: "https://starwars-visualguide.com/assets/img/planets/6.jpg",
            Endor: "https://starwars-visualguide.com/assets/img/planets/7.jpg",
            Naboo: "https://starwars-visualguide.com/assets/img/planets/8.jpg",
            Coruscant:
              "https://starwars-visualguide.com/assets/img/planets/9.jpg",
            Kamino:
              "https://starwars-visualguide.com/assets/img/planets/10.jpg",
            Geonosis:
              "https://starwars-visualguide.com/assets/img/planets/11.jpg",
            Utapau:
              "https://starwars-visualguide.com/assets/img/planets/12.jpg",
            Mustafar:
              "https://starwars-visualguide.com/assets/img/planets/13.jpg",
            Kashyyyk:
              "https://starwars-visualguide.com/assets/img/planets/14.jpg",
            "Polis Massa":
              "https://starwars-visualguide.com/assets/img/planets/15.jpg",
            Mygeeto:
              "https://starwars-visualguide.com/assets/img/planets/16.jpg",
            Felucia:
              "https://starwars-visualguide.com/assets/img/planets/17.jpg",
            "Cato Neimoidia":
              "https://starwars-visualguide.com/assets/img/planets/18.jpg",
            Saleucami:
              "https://starwars-visualguide.com/assets/img/planets/19.jpg",
          };

          // Set image for each planet based on the planetImageMap
          allPlanets = allPlanets.map((planet) => {
            return {
              ...planet,
              imgSource:
                planetImageMap[planet.name] ||
                "https://via.placeholder.com/150", // Default image if not found
            };
          });

          setStore({ planets: allPlanets }); // Save the limited data to the store
        } catch (error) {
          console.error("Error fetching planets data", error);
        }
      },

      // Add a function to fetch all vehicles data from the API
      fetchVehicles: async () => {
        try {
          let allVehicles = [];
          let page = 1;
          const maxResults = 10;

          while (allVehicles.length < maxResults) {
            const response = await fetch(
              `https://swapi.dev/api/vehicles/?page=${page}`
            );
            const data = await response.json();

            // Add results to allVehicles, but only up to maxResults
            allVehicles = allVehicles.concat(data.results);

            // Check if we have reached the maximum number of results
            if (allVehicles.length >= maxResults) {
              allVehicles = allVehicles.slice(0, maxResults); // Trim to maxResults if exceeded
              break;
            }

            if (data.next) {
              page += 1;
            } else {
              break;
            }
          }

          // Define a map for vehicle names to image sources
          const vehicleImageMap = {
            "Sand Crawler":
              "https://starwars-visualguide.com/assets/img/vehicles/4.jpg",
            "T-16 skyhopper":
              "https://starwars-visualguide.com/assets/img/vehicles/6.jpg",
            "X-34 landspeeder":
              "https://starwars-visualguide.com/assets/img/vehicles/7.jpg",
            "TIE/LN starfighter":
              "https://starwars-visualguide.com/assets/img/vehicles/8.jpg",
            Snowspeeder:
              "https://starwars-visualguide.com/assets/img/vehicles/14.jpg",
            "TIE bomber":
              "https://starwars-visualguide.com/assets/img/vehicles/16.jpg",
            "AT-AT":
              "https://starwars-visualguide.com/assets/img/vehicles/18.jpg",
            "AT-ST":
              "https://starwars-visualguide.com/assets/img/vehicles/19.jpg",
            "Storm IV Twin-Pod cloud car":
              "https://starwars-visualguide.com/assets/img/vehicles/20.jpg",
            "Sail barge":
              "https://starwars-visualguide.com/assets/img/vehicles/24.jpg",
          };

          // Set image for each vehicle based on the vehicleImageMap
          allVehicles = allVehicles.map((vehicle) => {
            return {
              ...vehicle,
              imgSource:
                vehicleImageMap[vehicle.name] ||
                "https://via.placeholder.com/400", // Default image if not found
            };
          });

          setStore({ vehicles: allVehicles }); // Save the limited data to the store
        } catch (error) {
          console.error("Error fetching vehicles data", error);
        }
      },

      // Create Agenda POST https://playground.4geeks.com/contact/agendas/myagenda
      // createAgenda: async () => {
      //   const slug = "myagenda";

      //   const response = await fetch(
      //     "https://playground.4geeks.com" + "/contact/agendas/" + slug,
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );

      //   if (response.ok) {
      //     console.log("Agenda created successfully");
      //   } else {
      //     console.error("Failed to create agenda");
      //   }
      // },

      getAgenda: async () => {
        const slug = "myagenda";

        const response = await fetch(
          "https://playground.4geeks.com" + "/contact/agendas/" + slug,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setStore({ contacts: data.contacts });
        } else {
          console.error("Failed to get agenda");
        }
      },

      addContact: async (contact) => {
        const slug = "myagenda";

        const response = await fetch(
          "https://playground.4geeks.com" + "/contact/" + slug,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
          }
        );

        if (response.ok) {
          console.log("Contact added successfully");
          getActions().getAgenda();
        } else {
          console.error("Failed to add contact");
        }
      },

      removeContact: async (contact) => {
        const slug = "myagenda";

        const response = await fetch(
          "https://playground.4geeks.com" +
            "/contact/agendas/" +
            slug +
            "/contacts/" +
            contact.id,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          console.log("Contact removed successfully");
          getActions().getAgenda();
        } else {
          console.error("Failed to remove contact");
        }
      },

      updateContact: async (contact) => {
        const slug = "myagenda";

        const response = await fetch(
          "https://playground.4geeks.com" +
            "/contact/agendas/" +
            slug +
            "/contacts/" +
            contact.id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
          }
        );

        if (response.ok) {
          console.log("Contact updated successfully");
          getActions().getAgenda();
        } else {
          console.error("Failed to update contact");
        }
      },
    },
  };
};

export default getState;
