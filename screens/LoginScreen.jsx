import React, { useEffect } from "react";
import { Text } from "react-native";
import { ContainerWithBackgroundColor, CustomButton } from "../components";
import InputText from "../components/form/fields/InputText";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { setImageUser, setUser } from "../app/features/userSlice";
import { useLoginMutation } from "../services/authService";
import { parseErrorAuth } from "../firebase/dataParsers";
import { insertSession, getSession, initDB } from "../localDb";
import { useGetImageProfileQuery } from "../services/profileService";

export function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState("pepitogrillo@gmail.com");
  const [password, setPassword] = React.useState("123123");
  const [passwordRepeat, setPasswordRepeat] = React.useState("");
  const [user_id, setUserId] = React.useState(null);
  const { data: imageProfileData, error: imageProfileError } =
    useGetImageProfileQuery(user_id, {
      skip: !user_id,
    });
  const [login, result] = useLoginMutation();
  const [error, setError] = React.useState("");
  const dispatch = useDispatch();
  const [dbReady, setDbReady] = React.useState(false);

  useEffect(() => {
    const checkDatabase = async () => {
      try {
        await initDB();
        setDbReady(true);
      } catch (error) {
        console.error('Error al verificar la base de datos:', error);
      }
    };
    
    checkDatabase();
  }, []);

  useEffect(() => {
    //- console.log("intento pasar useeffect de sesiones encontradas ", dbReady);
    if (!dbReady) return;
    //- console.log("pasé el if de dbReady", dbReady);

    getSession()
      .then((res) => {
        //- console.log("SESIONES ENCONTRADAS", res);
        if (res) {
          dispatch(setUser(res));
          onLogged(res);
        }
      })
      .catch((err) => {
        //- console.log("ERROR AL OBTENER LAS SESIONES", err);
      });
  }, [dbReady]);

  const handleChangeInput = (e, setData) => {
    setData(e);
  };
  const handleSignup = async () => {
    console.info("Datos a enviar a la APIa: ", email, password, passwordRepeat);
    login({
      email,
      password,
      passwordRepeat,
      returnSecureToken: true,
      expiresIn: "360000",
    });
  };
  useEffect(() => {
    //- console.log("intento pasar useeffect de login ", dbReady);
    if (!dbReady) return;
    //- console.log("pasé el if de dbReady", dbReady);

    if (result.isSuccess) {
      //- console.log("Usuario autenticado con éxito", result.data);
      dispatch(setUser(result.data));

      const insertSessionPromise = insertSession({
        localId: result.data.localId,
        email: result.data.email,
        token: result.data.idToken,
      });
      insertSessionPromise
        .then((res) => {
          //- //- console.log("SESION INSERTADA", res);
        })
        .catch((err) => {
          //- console.log("ERROR AL INSERTAR LA SESION", err);
        });
    } else if (result.isError) {
      console.info("Error al autenticarse", result.error?.data.error.message);
      setError(result.error?.data.error.message);
    }
  }, [result]);
  const onLogged = (user) => {
    if (imageProfileData) {
      //- console.log("guarde imagen", imageProfileData);
      dispatch(setImageUser(imageProfileData.blobImage));
    }
  };

  useEffect(() => {
    if (imageProfileData) {
      //- console.log("imageProfileData", imageProfileData);
      dispatch(setImageUser(imageProfileData.blobImage));
    }
  }, [imageProfileData]);
  return (
    <>
      <ContainerWithBackgroundColor gradients={["#111d5d", "#111d5d"]}>
        <View className={"flex-1 mt-3 p-3"}>
          <View>
            <Text className="text-white  text-4xl">¡Hola!</Text>
          </View>
          <View className="flex-1 mt-16">
            <Text className="text-white text-center text-2xl">
              Iniciá Sesión
            </Text>

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

            <View className="px-4">
              <CustomButton
                text={"Iniciar Sesion"}
                textClasses={"text-white text-center"}
                buttonClasses={
                  "bg-[#2e41a6] p-3 rounded-lg w-full mx-auto mt-4"
                }
                onPress={handleSignup}
              />
              <Text className="text-center text-red-500 mt-3">
                {parseErrorAuth(error)}
              </Text>
            </View>
            <View className="mt-5">
              <CustomButton
                textClasses={"text-white text-center underline"}
                text={"Si no tenés usuario, registrate"}
                onPress={() => navigation.navigate("Signup")}
              ></CustomButton>
            </View>
          </View>
        </View>
      </ContainerWithBackgroundColor>
    </>
  );
}
