export default function dataReducer(state, action) {
    switch (action.type) {
        case "VIDEO_UPDATE":
            return {
                ...state,
                videoData: [...state.videoData, ...action.payload],
            };
        case "PLAYLIST_UPDATE":
            return {
                ...state,
                playlistData: [...state.playlistData, ...action.payload],
            };
        case "PLAYLIST_REFRESH":
            console.log(action,"refresh");
            return {
                ...state,
                playlistData: [...action.payload],
            };
        case "ADD_VIDEO":
            const updatedPlaylistData = state.playlistData.map((item) =>
                item.name === action.payload.name
                    ? {
                          ...item,
                          videoIds: [...item.videoIds, action.payload._id],
                      }
                    : { ...item }
            );
            return {
                ...state,
                playlistData: updatedPlaylistData,
            };
        case "REMOVE_VIDEO":
            console.log(action, "in state", state.playlistData);
            const filteredPlaylistData = state.playlistData.map((item) => {
                console.log(item.videoIds);
                return item.name === action.payload.name
                    ? {
                          ...item,
                          videoIds: item.videoIds.filter(
                              (singleId) => singleId !== action.payload._id
                          ),
                      }
                    : { ...item };
            });

            return {
                ...state,
                playlistData: filteredPlaylistData,
            };
        default:
            return state;
    }
}
