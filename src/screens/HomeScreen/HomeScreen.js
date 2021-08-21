import React, { useEffect, useState } from "react";
import { FlatList, Keyboard, Text, ScrollView, View } from "react-native";
import styles from "./styles";
import { FAB } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import FormBuilder from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { firebase } from "../../firebase/config";

function HomeScreen({ navigation }) {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref("meals/")
      .on(
        "value",
        (querySnapshot) => {
          const aNewEntities = [];
          let oEntities = querySnapshot.val();
          try {
            Object.keys(oEntities).map((key) => {
              const oEntity = oEntities[key];
              console.log(oEntity);
              oEntity.id = key;
              aNewEntities.push(oEntity);
            });
          } catch (e) {
            console.log(e.toString());
          }
          setEntities(aNewEntities);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const renderEntity = ({ item, index }) => {
    return (
      <View style={styles.entityContainer}>
        <Card>
          <Card.Content>
            <Title>{item.title}</Title>
            <Paragraph>{item.full_description}</Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: item.featured_image }} />
          <Paragraph>{item.location}</Paragraph>
          <Paragraph>{item.cost}</Paragraph>
          <Paragraph>{item.date}</Paragraph>
          <Card.Actions>
            <Button onPress={() => navigation.navigate("Details", { item })}>
              Edit
            </Button>
            <Button
              onPress={() => {
                if (item.id)
                  firebase
                    .database()
                    .ref("meals/" + item.id)
                    .remove();
              }}
            >
              Delete
            </Button>
          </Card.Actions>
        </Card>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {entities && (
        <View style={styles.listContainer}>
          <FlatList
            data={entities}
            renderItem={renderEntity}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
        </View>
      )}
      <FAB
        style={styles.fab}
        large
        icon="plus"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  let item = {};
  try {
    item = route.params.item;
  } catch (e) {
    console.log(e.message);
  }
  console.log(item);
  const form = useForm({
    defaultValues: {
      title: item.title,
      meta_description: item.meta_description,
      full_description: item.full_description,
      featured_image: item.featured_image,
      ///////////////////////////////
      location: item.locations,
      cost: item.cost,
      date: item.date,
      //////////////////////////////
    },

    mode: "onChange",
  });

  return (
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Text style={styles.headingStyle}>Enter an upcoming meal</Text>

        <FormBuilder
          form={form}
          formConfigArray={[
            {
              type: "input",

              name: "title",

              label: "Title",

              location: "Location",

              cost: "Cost",

              date: "Date",

              rules: {
                required: {
                  value: true,

                  message: "Title is required",
                },
              },

              textInputProps: {
                keyboardType: "default",

                autoCapitalize: "none",
              },
            },

            {
              type: "input",

              name: "meta_description",

              label: "Meta Description",

              rules: {
                required: {
                  value: false,
                },
              },

              textInputProps: {
                multiline: true,
                numberOfLines: 4,
              },
            },
            {
              type: "input",

              name: "full_description",

              label: "Full Description",

              rules: {
                required: {
                  value: false,
                },
              },

              textInputProps: {
                multiline: true,
                numberOfLines: 4,
              },
            },
            {
              type: "input",

              name: "featured_image",

              label: "Featured Image",

              rules: {
                required: {
                  value: false,
                },
              },

              textInputProps: {
                keyboardType: "default",

                autoCapitalize: "none",
              },
            },
            ///////////////////////////////////////////
            {
              type: "input",

              name: "location",

              label: "Location",

              rules: {
                required: {
                  value: false,
                },
              },

              textInputProps: {
                keyboardType: "default",

                autoCapitalize: "none",
              },
            },
            {
              type: "input",

              name: "cost",

              label: "Cost",

              rules: {
                required: {
                  value: false,
                },
              },

              textInputProps: {
                keyboardType: "default",

                autoCapitalize: "none",
              },
            },
            {
              type: "input",

              name: "date",

              label: "Date",

              rules: {
                required: {
                  value: false,
                },
              },

              textInputProps: {
                keyboardType: "default",

                autoCapitalize: "none",
              },
            },
            /////////////////////////////////////////////
          ]}
        >
          <Button
            mode={"contained"}
            onPress={form.handleSubmit((data) => {
              console.log("form data", data);
              let entityID = new Date().toISOString().replace(".", "_");
              try {
                if (item.id) entityID = item.id;
                firebase
                  .database()
                  .ref("meals/" + entityID)
                  .set(data)
                  .then((_doc) => {
                    Keyboard.dismiss();
                    navigation.popToTop();
                  })
                  .catch((error) => {
                    alert(error);
                  });
              } catch (e) {
                console.log(e.message);
              }
            })}
          >
            Submit
          </Button>
        </FormBuilder>
      </ScrollView>
    </View>
  );
}

const Stack = createStackNavigator();

export default function () {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
