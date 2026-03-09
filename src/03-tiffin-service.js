/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  if (!name || name === null) {
    return null;
  }

  if (mealType === null || mealType === undefined) {
    return null;
  }

  let dailyRate = 0;
  switch (mealType) {
    case "veg":
      dailyRate = 80;
      break;
    case "nonveg":
      dailyRate = 120;
      break;
    case "jain":
      dailyRate = 90;
      break;
    default:
      return null;
    // dailyRate = 0;
    // break;
  }

  const totalCost = dailyRate * days;

  return { name, mealType, days, dailyRate, totalCost };
}

export function combinePlans(...plans) {
  if (plans.length === 0) {
    return null;
  }

  const totalCustomers = plans.length;
  const totalRevenue = plans.reduce((sum, p) => sum + p.totalCost, 0);
  const mealBreakdown = plans.reduce((mealObj, p) => {
    mealObj[p.mealType] = (mealObj[p.mealType] || 0) + 1;
    return mealObj;
  }, {});

  return { totalCustomers, totalRevenue, mealBreakdown };
}

export function applyAddons(plan, ...addons) {
  if (!plan || Object.keys(plan).length === 0) {
    return null;
  }

  if (plan.name === undefined) {
    return null;
  }

  if (!addons) {
    return { ...plan, addonNames: {} };
  }

  const { name, mealType, days, dailyRate, totalCost } = plan;
  const addonPrice = addons.reduce((sum, addon) => sum + addon.price, 0);

  const newDailyRate = dailyRate + addonPrice;

  const newTotalCost = newDailyRate * days;

  const addonNames = addons.map((addon) => addon.name);

  return {
    ...plan,
    dailyRate: newDailyRate,
    totalCost: newTotalCost,
    addonNames,
  };
}
