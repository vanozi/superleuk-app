export default {
    namespaced : true,
    state: {
        memories: [
          {
            id: "m1",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Physical_Map_of_India.jpg/731px-Physical_Map_of_India.jpg",
            title: "Wandelen in India",
            description: "Heerlijke curries gegeten",
          },
          {
            id: "m2",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Snowy_mountain_range.jpg/640px-Snowy_mountain_range.jpg",
            title: "Skieen in Oostenrijk",
            description: "Moeilijk hard van de Hara Kiri piste",
          },
          {
            id: "m3",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Swallow_flying_drinking.jpg/640px-Swallow_flying_drinking.jpg",
            title: "Wandelen met Freddy",
            description: "Prachtige vogel gezienn",
          },
        ],
      },
    mutations :{
      addMemory(state, memoryData) {
        const newMemory = {
          id: new Date().toISOString(),
          title : memoryData.title, 
          image : memoryData.imageUrl,
          description : memoryData.description
        };
        state.memories.unshift(newMemory);
      }
    },
    actions : {
      addMemory(context, memoryData) {
        context.commit('addMemory', memoryData);
      }
    },
    getters:{
      memories(state) {
          return state.memories
      },
      memory(state) {
          return (memoryId) => {
              return state.memories.find(memory => memory.id === memoryId)
          };
      }
    }
  };