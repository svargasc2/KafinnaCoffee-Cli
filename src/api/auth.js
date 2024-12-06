import instance from "./api";

export const protectedRoute = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const clientAxios = instance.create({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return clientAxios;
  } else {
    const clientAxios = instance.create({
      headers: {
        authorization: `Bearer null`,
      },
    });
    return clientAxios;
  }
};
