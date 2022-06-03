import { POST_ACTION_TYPES, TODO_ACTION_TYPES } from "../action/ActionTypes";

export const PostReducer = (state, action) => {
    switch (action.type) {
        case POST_ACTION_TYPES.ADD_POST:
            console.log("Add Post ", action.newPost);
            return { ...state, posts: [...state.posts, action.newPost] };
        case POST_ACTION_TYPES.DELETE_POST:
            console.log("Delete Post ", action.postId);
            return { ...state, posts: state.posts.filter((p) => p.id !== action.postId) };
        case POST_ACTION_TYPES.UPDATE_POST:
            console.log("Update Post ", action.postId);
            const updatePosts = [...state.posts];
            const updatePost = updatePosts.find((post) => post.id === action.postId);
            updatePost.title = action.title;
            updatePost.summary = action.summary;
            updatePost.content = action.content;
            const updatePostIndex = updatePosts.indexOf(updatePost);
            updatePosts[updatePostIndex] = updatePost;
            return { ...state, posts: updatePosts };
        case POST_ACTION_TYPES.LIKE_POST:
            console.log("Like Post ", action.postId);
            const likePosts = state.posts;
            const likePost = likePosts.find((post) => post.id === action.postId);
            likePost.isLike = true;
            const likePostIndex = state.posts.indexOf(likePost);
            likePosts[likePostIndex] = likePost;
            return { ...state, posts: likePosts };
        default:
            return state;
    }
};


export const TodoReducer = (state, action) => {
    const todos = [...state];
    switch(action.type) { 
        case TODO_ACTION_TYPES.ADD_TODO : 
            const newTodo = action.payload.newTodo;
            console.log("Add todo : " , newTodo );
            return [...todos, newTodo];
        case TODO_ACTION_TYPES.TOGGLE_TODO_DONE:
            console.log("Toggel todo done flag : ", action.payload.id);
            const doneTodo = todos.find(td => td.id === action.payload.id);
            doneTodo.done = !doneTodo.done;
            todos[todos.indexOf(doneTodo)] = doneTodo;
            return todos;
        case TODO_ACTION_TYPES.TOGGLE_TODO_IMPRT:
            console.log("Toggel todo important flag : ", action.payload.id);
            const imprtTodo = todos.find(td => td.id === action.payload.id);
            imprtTodo.imprtFlag = !imprtTodo.imprtFlag;
            todos[todos.indexOf(imprtTodo)] = imprtTodo;
            return todos;
        case TODO_ACTION_TYPES.DELETE_TODO:
            console.log("Toggel todo important flag : ", action.payload.id);
            return todos.filter(todo => todo.id !== action.payload.id);
        default:
            return state;
    }
}