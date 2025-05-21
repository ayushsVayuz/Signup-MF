import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

/**
 * Creates a Zustand store to handle user actions and state updates.
 */
const signupStore = create((set, get) => ({
  signupLoader: false,
  payload: null,
  user: null,
  error: null,

  /**
   * Registers a new user with API.
   * @param {Object} formData - User registration details.
   * @return {Promise<Object>} API response.
   */
  async registerUser(formData) {
    set({ signupLoader: true });
    console.log("inside signup");

    try {
      const response = await axios.post(
        `${process.env.API}/auth/signup`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
console.log("inside signup res", response);

      set({
        signupLoader: false,
        payload: response.data.data,
      });
      return response;
    } catch (error) {
      set({
        signupLoader: false,
      });
      toast.error("Signup failed!");
    }
  },
}));

export default signupStore;
