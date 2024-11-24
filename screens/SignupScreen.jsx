import React, { useEffect } from "react";
import { Text } from "react-native";
import { ContainerWithBackgroundColor, CustomButton } from "../components";
import InputText from "../components/form/fields/InputText";
import { View } from "react-native";
import { useSignUpMutation } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../app/features/userSlice";
import { parseErrorAuth } from "../firebase/dataParsers";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordRepeat, setPasswordRepeat] = React.useState("");
  const [error, setError] = React.useState("");
  const [signUp, result] = useSignUpMutation();
  const dispatch = useDispatch();

  const handleChangeInput = (e, setData) => {
    setData(e);
  };
  const handleSignup = async () => {
    console.info("Datos a enviar a la APIa: ", email, password, passwordRepeat);
    signUp({
      email,
      password,
      passwordRepeat,
      returnSecureToken: true,
      expiresIn: "360000",
    });
  };
  useEffect(() => {
    if (result.isSuccess) {
      //- console.log("Usuario creado con éxito", result.data);
      dispatch(setUser(result.data));
    } else if (result.isError) {
      console.info("Error al crear usuario", result.error?.data.error.message);
      setError(result.error?.data.error.message);
    }
  }, [result]);

  return (
    <>
      <ContainerWithBackgroundColor gradients={["#111d5d", "#111d5d"]}>
        <View className={"flex-1 mt-3 p-3"}>
          <View>
            <Text className="text-white  text-4xl">¡Hola!</Text>
          </View>
          <View className="flex-1 mt-16">
            <Text className="text-white text-center text-2xl">Registrate</Text>

            <View className="p-4">
              <InputText
                value={email}
                onChangeText={(value) => handleChangeInput(value, setEmail)}
                viewClasses=""
                inputClasses={"text-white bg-[#2e41a6] p-1 rounded-lg w-full "}
                labelText={"Ingresá tu email"}
                textClasses={"text-white"}
                placeholder={"ejemplo@ejemplo.com"}
                placeholderTextColor={"#d0d3d0"}
              />
            </View>
            <View className="p-4">
              <InputText
                value={password}
                onChangeText={(value) => handleChangeInput(value, setPassword)}
                viewClasses=""
                inputClasses={"text-white bg-[#2e41a6] p-1 rounded-lg w-full "}
                labelText={"Ingresá una clave"}
                textClasses={"text-white"}
                placeholderTextColor={"#d0d3d0"}
              />
            </View>
            <View className="p-4">
              <InputText
                value={passwordRepeat}
                onChangeText={(value) =>
                  handleChangeInput(value, setPasswordRepeat)
                }
                viewClasses=""
                inputClasses={"text-white bg-[#2e41a6] p-1 rounded-lg w-full "}
                labelText={"Repetí la clave"}
                textClasses={"text-white"}
                placeholderTextColor={"#d0d3d0"}
              />
            </View>
            <View className="p-4">
              <CustomButton
                text={"Crear cuenta"}
                textClasses={"text-white text-center"}
                buttonClasses={"bg-[#2e41a6] p-3 rounded-lg w-1/2 mx-auto mt-4"}
                onPress={handleSignup}
              />
              <Text className="text-center text-red-500 mt-3">
                {parseErrorAuth(error)}
              </Text>
            </View>
            <View className="mt-5">
              <CustomButton
                textClasses={"text-white text-center underline"}
                text={"Ya tengo un usuario"}
                onPress={() => navigation.navigate("Login")}
                isDisabled={password === "" || email === "" || password !=passwordRepeat}
              ></CustomButton>
            </View>
          </View>
        </View>
      </ContainerWithBackgroundColor>
    </>
  );
}
