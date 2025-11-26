import User from "./src/models/user.model.js";

export const seedDatabase = async () => {
  try {
    const existing = await User.findOne({
      where: { email: "admin@tech.com" },
    });

    if (!existing) {
      await User.create({
        email: "admin@tech.com",
        password: "987654",
      });
      console.log("🌱 Usuario admin creado");
    } else {
      console.log("ℹ️ Usuario admin ya existe");
    }
  } catch (error) {
    console.error("❌ Error al ejecutar seed:", error.message);
  }
};
