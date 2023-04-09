import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { CommonStyles } from "../CommonStyles";

const Scholarship = () => {
  const data = [
    {
      title: "Bikash Bhavan Scholarship 2023",
      price: "Class 11,12, Undergraduate, Postgraduate",
      description:
        "With a view to assisting the meritorious students belonging to economically backward families in the State of West Bengal to pursue higher studies, the Government of West Bengal introduces this scheme of giving scholarships at different levels of higher studies, at educational institutions based in West Bengal. The Swami Vivekananda Merit Cum Means Scholarship Scheme has been thoroughly revamped in the year 2016 to cover more number of students as well as to enhance the scholarship amounts significantly..",
      user: "Govt of West Bengal",
      contact_number: "https://svmcm.wbhed.gov.in/page/about.php",
    },
    {
      title: "HDFC Scholarship 2023",
      description:
        "HDFC Bank, India’s leading banking and financial service provider, has introduced this scholarship as part of its flagship programme – Educational Crisis Scholarship (ECS). The bank has been undertaking various projects in the field of education and livelihood training as part of its social initiative - Parivartan",
      price: "Class 1 to UG and PG programmes.",
      location: "Bangalore",
      user: "HDFC Bank",
      contact_number:
        "https://www.buddy4study.com/page/hdfc-bank-parivartans-ecs-scholarship",
    },
    {
      title: "ONGC Scholarship",
      description:
        "ONGC Scholarship 2023 is an exclusive scholarship opportunity for students belonging to SC/ST/OBC and General categories who are studying in the first year of Engineering, MBBS, MBA or Master’s in Geophysics/Geology programme. Run by ONGC (Oil and Natural Gas Company) Limited, under its CSR initiative, the scholarship rewards 2000 meritorious students every year.",
      price: "Scheduled Caste (SC) Other Backward Classes (OBC) ",
      location: "Bangalore",
      user: "Govt of India",
      contact_number: "https://www.buddy4study.com/article/ongc-scholarship",
    },
    {
      title: "SBI Scholarship",
      description:
        "SBI Scholarship 2023 is a scholarship scheme for students who are pursuing their higher education in India. The scholarship is offered by the State Bank of India (SBI) and is available for students belonging to the Scheduled Caste (SC), Scheduled Tribe (ST), Other Backward Classes (OBC), and Economically Weaker Sections (EWS) categories.",
      price: "Class 1 to UG and PG programmes.",
      location: "Bangalore",
      user: "State Bank of India",
      contact_number: "https://www.buddy4study.com/article/sbi-scholarship",
    },
    {
      title: "Siemens Scholarship",
      description:
        "SBI Scholarship 2023 is a scholarship scheme for students who are pursuing their higher education in India. The scholarship is offered by the State Bank of India (SBI) and is available for students belonging to the Scheduled Caste (SC), Scheduled Tribe (ST), Other Backward Classes (OBC), and Economically Weaker Sections (EWS) categories.",
      price: "1st Year Engineering from Government Colleges",
      location: "Bangalore",
      user: "Siemens Inc",
      contact_number:
        "https://new.siemens.com/in/en/company/sustainability/corporate-citizenship/siemens-scholarship-program.html",
    },
    {
      title: "TCS Scholarship",
      description:
        "TCS Scholarship 2023 is a scholarship scheme for students who are pursuing their higher education in India. The scholarship is offered by the State Bank of India (SBI) and is available for students belonging to the Scheduled Caste (SC), Scheduled Tribe (ST), Other Backward Classes (OBC), and Economically Weaker Sections (EWS) categories.",
      price: "Class 1 to UG and PG programmes.",
      location: "Bangalore",
      user: "Tata Consultancy Services",
      contact_number: "https://www.buddy4study.com/article/tcs-scholarship",
    },
  ];

  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      style={{ padding: 30, marginBottom: 105 }}
      data={data}
      renderItem={({ item }) => {
        return (
          <View style={CommonStyles.card}>
            <View style={CommonStyles.cardRow}>
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.silentText}>{item.price}</Text>
              </View>
              <View></View>
            </View>
            <Text>{item.description}</Text>
            <View style={CommonStyles.divider}></View>

            <Text
              style={{
                ...CommonStyles.silentText,
                marginTop: 20,
                fontWeight: "bold",
              }}
            >
              Posted By : {item.user}
            </Text>
            <View>
              <TouchableOpacity
                style={{
                  ...CommonStyles.outlineBlueBtn,
                  width: "100%",
                  marginTop: 15,
                }}
                onPress={() => {
                  Linking.openURL(`${item.contact_number}`);
                }}
              >
                <Text
                  style={{
                    ...CommonStyles.blue,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Know More
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    />
  );
};

export default Scholarship;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 7,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
