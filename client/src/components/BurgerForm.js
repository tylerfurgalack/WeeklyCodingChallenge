import React, { useReducer } from "react";
import FormError from "./layout/FormError";

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "TOGGLE_SIDES":
      return { ...state, showSides: !state.showSides };
    default:
      return state;
  }
};

const BurgerForm = () => {
  // Initial form state
  const initialFormState = {
    burgers: "",
    type: "medium",
    toppings: [],
    bun: "hawaiian",
    showSides: false,
    side: "none",
  };

  // useReducer hook
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const onChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;

    let fieldValue;

    if (type === "checkbox") {
      const currentToppings = formState.toppings.slice(); // Create a copy of the array
      if (checked) {
        currentToppings.push(value); // Add the topping to the array
      } else {
        const index = currentToppings.indexOf(value);
        if (index !== -1) {
          currentToppings.splice(index, 1); // Remove the topping from the array
        }
      }
      fieldValue = currentToppings;
    } else {
      fieldValue = value;
    }

    const action = { type: "UPDATE_FIELD", field: name, value: fieldValue };
    dispatch(action);
  };

  const toggleVisibility = (e) => {
    e.preventDefault();
    dispatch({ type: "TOGGLE_SIDES" });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(
      `BURGER ORDER
    Burgers:${formState.burgers}
    Cooked Type: ${formState.type}
    Toppings: ${formState.toppings.join(", ")}
    Bun: ${formState.bun}
    Side: ${formState.side}
    `
    );
    try {
      // Send the form data to the server
      const response = await fetch("/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        console.log("Order submitted!");
      } else {
        console.log("Order failed!");
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  return (
    <div className="form-container">
      <h3>Big Kahuna Burger </h3>
      <form onSubmit={onSubmitHandler}>
        <label>Burgers</label>
        <input
          className="form-input"
          name="burgers"
          placeholder="How many?"
          type="number"
          value={formState.burgers}
          onChange={onChangeHandler}
        ></input>
        <label>Type of Burger</label>
        <select
          className="form-input"
          name="type"
          value={formState.type}
          onChange={onChangeHandler}
        >
          <option value="medium">Medium</option>
          <option value="medium-rare">Medium Rare</option>
          <option value="well-done">Well Done</option>
          <option value="chicken">Chicken</option>
          <option value="vegan">Vegan</option>
        </select>
        <div>
          Toppings
          <input
            type="checkbox"
            name="toppings"
            value="lettuce"
            checked={formState.toppings.includes("lettuce")}
            onChange={onChangeHandler}
          ></input>
          <label>Lettuce</label>
          <input
            type="checkbox"
            name="toppings"
            value="tomato"
            checked={formState.toppings.includes("tomato")}
            onChange={onChangeHandler}
          ></input>
          <label>Tomato</label>
          <input
            type="checkbox"
            name="toppings"
            value="onion"
            checked={formState.toppings.includes("onion")}
            onChange={onChangeHandler}
          ></input>
          <label>Onion</label>
          <input
            type="checkbox"
            name="toppings"
            value="pickles"
            checked={formState.toppings.includes("pickles")}
            onChange={onChangeHandler}
          ></input>
          <label>Pickles</label>
          <input
            type="checkbox"
            name="toppings"
            value="cheese"
            checked={formState.toppings.includes("cheese")}
            onChange={onChangeHandler}
          ></input>
          <label>Cheese</label>
          <input
            type="checkbox"
            name="toppings"
            value="mayo"
            checked={formState.toppings.includes("mayo")}
            onChange={onChangeHandler}
          ></input>
          <label>Mayo</label>
          <input
            type="checkbox"
            name="toppings"
            value="ketchup"
            checked={formState.toppings.includes("ketchup")}
            onChange={onChangeHandler}
          ></input>
          <label>Ketchup</label>
        </div>
        <div>
          Select a Bun
          <div>
            <input
              type="radio"
              name="bun"
              value="hawaiian"
              checked={formState.bun === "hawaiian"}
              onChange={onChangeHandler}
            />
            <label>Hawaiian roll</label>
          </div>
          <div>
            <input
              type="radio"
              name="bun"
              value="gluten-free"
              checked={formState.bun === "gluten-free"}
              onChange={onChangeHandler}
            />
            <label>Gluten free</label>
          </div>
        </div>
        <div>
          <button type="button" className="button" onClick={toggleVisibility}>
            Do you want a side?
          </button>

          {formState.showSides && (
            <select
              className="form-input"
              name="side"
              value={formState.side}
              onChange={onChangeHandler}
            >
              <option value="none">-</option>
              <option value="fries">Fries</option>
              <option value="salad">Salad</option>
              <option value="chips">Chips</option>
              <option value="veggies">Veggies</option>
            </select>
          )}
        </div>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default BurgerForm;
