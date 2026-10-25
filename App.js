import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
const RED = '#E6392E';
const NAVY = '#071A36';
const BLUE = '#003087';
const MUTED = '#6D7A8D';



function Badge({ children, color = '#E9F5EF', textColor = '#23754B' }) {
  return <View style={[styles.badge, { backgroundColor: color }]}><Text style={{ color: textColor, fontSize: 11, fontWeight: '800' }}>{children}</Text></View>;
}

function MapCard({ assigned }) {
  return <View style={styles.map}>
    <View style={[styles.road, { top: 66, left: -12, width: '115%', transform: [{ rotate: '-13deg' }] }]} />
    <View style={[styles.road, { top: 142, left: -20, width: '120%', transform: [{ rotate: '14deg' }] }]} />
    <View style={[styles.road, { top: -5, left: '43%', height: 260, width: 15 }]} />
    <View style={[styles.road, { top: -10, left: '72%', height: 260, width: 10, transform: [{ rotate: '24deg' }] }]} />
    <Text style={[styles.mapLabel, { top: 15, left: 18 }]}>BEREA</Text>
    <Text style={[styles.mapLabel, { top: 120, right: 16 }]}>DURBAN CBD</Text>
    <Text style={[styles.mapLabel, { bottom: 18, left: 30 }]}>MUSGRAVE</Text>
    <View style={styles.userPin}><View style={styles.pinDot} /></View>
    <View style={[styles.scooterPin, assigned && styles.scooterMoving]}><Text style={{ fontSize: 17 }}>＋</Text></View>
    <View style={styles.routeLine} />
    <View style={styles.mapCaption}><Text style={{ color: NAVY, fontWeight: '800', fontSize: 12 }}>◉  DURBAN, KWAZULU-NATAL</Text><Text style={{ color: MUTED, fontSize: 11, marginTop: 3 }}>Demo map · simulated locations</Text></View>
  </View>;
}

export default function App() {
  const [screen, setScreen] = useState('login');
  const [assigned, setAssigned] = useState(false);
  const [responseHistory, setResponseHistory] = useState([
  {
    id: '1',
    type: 'Medical assistance',
    location: 'Durban CBD',
    date: '24 October 2026, 14:35',
    status: 'Demo response completed',
  },
  {
    id: '2',
    type: 'Emergency assistance',
    location: 'Umhlanga, Durban',
    date: '23 October 2026, 09:20',
    status: 'Demo request closed',
  },
  {
    id: '3',
    type: 'First aid information',
    location: 'Berea, Durban',
    date: '22 October 2026, 16:10',
    status: 'Information viewed',
  },
]);
  const [family, setFamily] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Community responder registration
  const [responderForm, setResponderForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    area: '',
    responderType: 'medical',
    training: '',
    availability: 'Flexible',
  });
  const dispatch = () => {
  const request = {
    id: Date.now().toString(),
    type: 'Medical assistance',
    location: 'Durban',
    date: new Date().toLocaleString(),
    status: 'Demo request created',
  };

  setResponseHistory(previous => [request, ...previous]);
  setAssigned(true);
  setScreen('response');
};

  const [responderApplications, setResponderApplications] = useState([]);

// Patient registration
const [patientForm, setPatientForm] = useState({
  fullName: '',
  email: '',
  phone: '',
  area: '',
  medicalNotes: '',
});

const updatePatientField = (field, value) => {
  setPatientForm(previous => ({
    ...previous,
    [field]: value,
  }));
};

const submitPatientSignup = () => {
  const { fullName, email, phone, area } = patientForm;

  if (
    !fullName.trim() ||
    !email.trim() ||
    !phone.trim() ||
    !area.trim()
  ) {
    Alert.alert(
      'Missing information',
      'Please complete your name, email, phone number, and area.'
    );
    return;
  }

  Alert.alert(
    'Registration complete',
    'Your details have been entered in this demo. They have not been sent to a medical team.'
  );

  setScreen('home');
};
const handleLogout = () => {
  setEmail('');
  setPassword('');
  setAssigned(false);
  setFamily(false);
  setExpanded(false);
  setScreen('login');
};
 
  const handleLogin = () => {
    if (!email.trim() || !password) {
      Alert.alert(
        'Missing information',
        'Please enter your email and password.'
      );
      return;
    }

    // Demo login only. Real account authentication is not connected yet.
    setScreen('home');
  };

  const updateResponderField = (field, value) => {
    setResponderForm(previous => ({
      ...previous,
      [field]: value,
    }));
  };

  const submitResponderApplication = () => {
    const { fullName, email, phone, area } = responderForm;

    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !area.trim()
    ) {
      Alert.alert(
        'Missing information',
        'Please enter your name, email, phone number, and area.'
      );
      return;
    }

    const application = {
      ...responderForm,
      id: Date.now().toString(),
      status: 'Pending review',
    };

    setResponderApplications(previous => [
      ...previous,
      application,
    ]);

    Alert.alert(
      'Application received',
      'Your application is saved temporarily in this demo. It has not been sent to an administrator.'
    );

    setResponderForm({
      fullName: '',
      email: '',
      phone: '',
      area: '',
      responderType: 'medical',
      training: '',
      availability: 'Flexible',
    });

    setScreen('home');
  };

  

  const nav = (key) => {
    setScreen(key);
  };


  return <SafeAreaView style={styles.safe}>
    <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" />
    <View style={styles.header}>
      <View style={styles.brandMark}><Text style={{ color: 'white', fontWeight: '900', fontSize: 19 }}>+</Text></View>
      <View style={{ flex: 1 }}><Text style={styles.brand}>RapidPulse <Text style={{ color: RED }}>Durban</Text></Text><Text style={styles.subBrand}>EMERGENCY RESPONSE</Text></View>
      <TouchableOpacity style={styles.helpButton} onPress={() => setScreen('firstaid')}><Text style={{ fontWeight: '800', color: BLUE, fontSize: 18 }}>?</Text></TouchableOpacity>
    </View>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
   
{screen === 'login' && (
  <View style={styles.loginCard}>
    <Text style={styles.title}>Welcome back.</Text>

    <Text style={styles.body}>
      Get helpful first-aid guidance while you wait for an
      ambulance to arrive. RapidPulse Durban helps you stay
      informed while you seek emergency assistance.
    </Text>

    <TouchableOpacity
      style={styles.emergencyButton}
      onPress={() => setScreen('patientSignup')}
    >
      <Text style={styles.emergencyText}>SIGN UP</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[
        styles.emergencyButton,
        { backgroundColor: BLUE, marginTop: 10 },
      ]}
      onPress={() => setScreen('communitySignup')}
    >
      <Text style={styles.emergencyText}>
        REGISTER AS A RESPONDER
      </Text>
    </TouchableOpacity>

    <Text style={[styles.body, { textAlign: 'center', marginTop: 18 }]}>
      Already have an account? Sign in below.
    </Text>

    <Text style={styles.inputLabel}>Email address</Text>
    <TextInput
      style={styles.loginInput}
      placeholder="Enter your email"
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
      autoCapitalize="none"
    />

    <Text style={styles.inputLabel}>Password</Text>
    <TextInput
      style={styles.loginInput}
      placeholder="Enter your password"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
    />

    <TouchableOpacity
      style={[styles.emergencyButton, { marginTop: 16 }]}
      onPress={handleLogin}
    >
      <Text style={styles.emergencyText}>SIGN IN</Text>
    </TouchableOpacity>
  </View>
)}

{screen === 'patientSignup' && (
  
  <View style={styles.loginCard}>
    <TouchableOpacity onPress={() => setScreen('login')}>
      <Text style={{ color: BLUE, marginBottom: 18 }}>
        ← Back to sign in
      </Text>
    </TouchableOpacity>

    <Text style={styles.title}>Patient Registration</Text>
    <Text style={styles.body}>
      Create your RapidPulse Durban profile.
    </Text>

    <Text style={styles.inputLabel}>Full name</Text>
    <TextInput
      style={styles.loginInput}
      placeholder="Enter your full name"
      value={patientForm.fullName}
      onChangeText={value => updatePatientField('fullName', value)}
    />

    <Text style={styles.inputLabel}>Email address</Text>
    <TextInput
      style={styles.loginInput}
      placeholder="Enter your email"
      value={patientForm.email}
      onChangeText={value => updatePatientField('email', value)}
      keyboardType="email-address"
      autoCapitalize="none"
    />

    <Text style={styles.inputLabel}>Phone number</Text>
    <TextInput
      style={styles.loginInput}
      placeholder="Enter your phone number"
      value={patientForm.phone}
      onChangeText={value => updatePatientField('phone', value)}
      keyboardType="phone-pad"
    />

    <Text style={styles.inputLabel}>Area in Durban</Text>
    <TextInput
      style={styles.loginInput}
      placeholder="e.g. Umlazi"
      value={patientForm.area}
      onChangeText={value => updatePatientField('area', value)}
    />

    <Text style={styles.inputLabel}>
      Important medical information (optional)
    </Text>
    <TextInput
      style={[styles.loginInput, { minHeight: 80 }]}
      placeholder="Allergies or other important information"
      value={patientForm.medicalNotes}
      onChangeText={value => updatePatientField('medicalNotes', value)}
      multiline
    />

    <TouchableOpacity
      style={styles.emergencyButton}
      onPress={submitPatientSignup}
    >
      <Text style={styles.emergencyText}>
        CREATE PATIENT ACCOUNT
      </Text>
    </TouchableOpacity>
  </View>
)}


{screen === 'communitySignup' && (
  <View style={styles.loginCard}>
    <TouchableOpacity onPress={() => setScreen('login')}>
      <Text style={{ color: BLUE, marginBottom: 18 }}>
        ← Back
      </Text>
    </TouchableOpacity>

    <Text style={styles.title}>Join our team.</Text>

    <Text style={styles.body}>
      Register your interest in helping your Durban community.
    </Text>

    <Text style={styles.inputLabel}>Full name</Text>
    <TextInput
      style={styles.loginInput}
      placeholder="Your full name"
      value={responderForm.fullName}
      onChangeText={value =>
        updateResponderField('fullName', value)
      }
    />

    <Text style={styles.inputLabel}>Email address</Text>
    <TextInput
      style={styles.loginInput}
      placeholder="Your email"
      keyboardType="email-address"
      autoCapitalize="none"
      value={responderForm.email}
      onChangeText={value =>
        updateResponderField('email', value)
      }
    />

    <Text style={styles.inputLabel}>Phone number</Text>
    <TextInput
      style={styles.loginInput}
      placeholder="Your phone number"
      keyboardType="phone-pad"
      value={responderForm.phone}
      onChangeText={value =>
        updateResponderField('phone', value)
      }
    />

    <Text style={styles.inputLabel}>Your area in Durban</Text>
    <TextInput
      style={styles.loginInput}
      placeholder="e.g. Berea"
      value={responderForm.area}
      onChangeText={value =>
        updateResponderField('area', value)
      }
    />

    <Text style={styles.inputLabel}>
      Choose your responder team
    </Text>

    <TouchableOpacity
      style={{
        padding: 14,
        marginBottom: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor:
          responderForm.responderType === 'medical'
            ? RED
            : '#D9DFE8',
        backgroundColor:
          responderForm.responderType === 'medical'
            ? '#FFF1EF'
            : '#FFFFFF',
      }}
      onPress={() =>
        updateResponderField('responderType', 'medical')
      }
    >
      <Text style={styles.cardTitle}>
        🚑 Medical Emergency Responder
      </Text>

      <Text style={styles.cardSub}>
        Help with emergency assistance within your training
        and abilities.
      </Text>

      <Text style={{ color: BLUE, marginTop: 8 }}>
        {responderForm.responderType === 'medical'
          ? '✓ Selected'
          : 'Select team'}
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{
        padding: 14,
        marginBottom: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor:
          responderForm.responderType === 'gbv'
            ? RED
            : '#D9DFE8',
        backgroundColor:
          responderForm.responderType === 'gbv'
            ? '#FFF1EF'
            : '#FFFFFF',
      }}
      onPress={() =>
        updateResponderField('responderType', 'gbv')
      }
    >
      <Text style={styles.cardTitle}>
        🛡️ GBV Support Responder
      </Text>

      <Text style={styles.cardSub}>
        Help people access safe support and professional
        services.
      </Text>

      <Text style={{ color: BLUE, marginTop: 8 }}>
        {responderForm.responderType === 'gbv'
          ? '✓ Selected'
          : 'Select team'}
      </Text>
    </TouchableOpacity>

    <Text style={styles.inputLabel}>
      Training or experience
    </Text>

    <TextInput
      style={[styles.loginInput, { minHeight: 80 }]}
      placeholder="Describe relevant training or volunteer experience"
      multiline
      value={responderForm.training}
      onChangeText={value =>
        updateResponderField('training', value)
      }
    />

    <Text style={styles.inputLabel}>Availability</Text>

    {['Weekdays', 'Weekends', 'Flexible'].map(option => (
      <TouchableOpacity
        key={option}
        onPress={() =>
          updateResponderField('availability', option)
        }
        style={{ paddingVertical: 8 }}
      >
        <Text style={{ color: NAVY }}>
          {responderForm.availability === option
            ? '🔘'
            : '⚪'}{' '}
          {option}
        </Text>
      </TouchableOpacity>
    ))}

    <TouchableOpacity
      style={styles.emergencyButton}
      onPress={submitResponderApplication}
    >
      <Text style={styles.emergencyText}>
        SUBMIT APPLICATION
      </Text>
    </TouchableOpacity>

    <Text
      style={[
        styles.cardSub,
        { marginTop: 15, lineHeight: 18 },
      ]}
    >
      Applications must be reviewed before a person can act
      as a responder. This demo does not dispatch real
      responders or send applications to a server.
    </Text>
  </View>
)}
      {screen === 'home' && <>
<View
  style={{
    backgroundColor: '#071A36',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  }}
>
  <Text
    style={{
      color: '#E6392E',
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 8,
    }}
  >
    MAKES US DIFFERENT?WHAT 
  </Text>

  <Text
    style={{
      color: '#FFFFFF',
      fontSize: 23,
      fontWeight: 'bold',
      marginBottom: 10,
    }}
  >
    More than an SOS button.
  </Text>

  <Text
    style={{
      color: '#E0E7F0',
      fontSize: 15,
      lineHeight: 23,
      marginBottom: 16,
    }}
  >
    RapidPulse Durban focuses on helping people prepare,
    understand basic first-aid steps, record patient
    information and explore ways to support their community.
  </Text>

  <View style={{ marginBottom: 12 }}>
    <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
      01  Learn
    </Text>
    <Text style={{ color: '#D0D9E6', marginTop: 4 }}>
      Access first-aid guidance and safety information.
    </Text>
  </View>

  <View style={{ marginBottom: 12 }}>
    <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
      02  Prepare
    </Text>
    <Text style={{ color: '#D0D9E6', marginTop: 4 }}>
      Record patient details in your demo profile.
    </Text>
  </View>

  <View>
    <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
      03  Participate
    </Text>
    <Text style={{ color: '#D0D9E6', marginTop: 4 }}>
      Register your interest in community assistance.
    </Text>
  </View>
</View>
<View style={styles.gbvCard}>
  <Text style={styles.gbvTitle}>Need help urgently?</Text>

  <Text style={styles.gbvDescription}>
    If you are in danger or experiencing gender-based violence,
    request urgent assistance.
  </Text>

  <TouchableOpacity
    style={styles.gbvButton}
    onPress={() =>
      Alert.alert(
        'GBV Emergency',
        'This prototype does not yet send alerts. Connect the security alert service before using this feature in a real emergency.'
      )
    }
  >
    <Text style={styles.gbvButtonText}>
      🚨 GBV PANIC BUTTON
    </Text>
  </TouchableOpacity>

  <Text style={styles.gbvNote}>
    Location sharing and security alerts must be configured.
  </Text>
</View>

        <View style={styles.demoNotice}><Text style={styles.noticeDot}>●</Text><Text style={styles.noticeText}>DEMO MODE · No real responders are dispatched</Text></View>
        <Text style={styles.eyebrow}>DURBAN RESPONSE NETWORK</Text>
        <Text style={styles.title}>Help is closer{ '\n' }than you think.</Text>
        <Text style={styles.body}>Request a medical scooter for rapid first response while emergency services are on their way.</Text>
        <MapCard assigned={false} />
        <View style={styles.nearby}><View style={styles.nearbyIcon}><Text style={{ fontSize: 18 }}>✚</Text></View><View style={{ flex: 1 }}><Text style={styles.cardTitle}>Standby team nearby</Text><Text style={styles.cardSub}>Availability is simulated for this demo</Text></View><Badge>READY</Badge></View>
        <TouchableOpacity style={styles.emergencyButton} onPress={dispatch} activeOpacity={0.85}><Text style={styles.emergencyIcon}>✚</Text><View><Text style={styles.emergencyText}>REQUEST EMERGENCY HELP</Text><Text style={styles.emergencySub}>Tap to simulate a response</Text></View><Text style={styles.arrow}>›</Text></TouchableOpacity>
        <Text style={styles.callout}>If this is life-threatening, call <Text style={{ color: RED, fontWeight: '900' }}>112</Text> now.</Text>
        <View style={styles.quickRow}><TouchableOpacity style={styles.quickCard} onPress={() => setScreen('firstaid')}><Text style={styles.quickIcon}>＋</Text><Text style={styles.quickTitle}>First aid</Text><Text style={styles.quickSub}>Helpful steps</Text></TouchableOpacity><TouchableOpacity style={styles.quickCard} onPress={() => setScreen('history')}><Text style={styles.quickIcon}>◷</Text><Text style={styles.quickTitle}>Response history</Text><Text style={styles.quickSub}>Past requests</Text></TouchableOpacity></View>
        <TouchableOpacity
  onPress={handleLogout}
  style={{
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: RED,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  }}
>
  <Text style={{ color: RED, fontWeight: '800' }}>
    LOG OUT
  </Text>
</TouchableOpacity>
      </>}

      {screen === 'response' && <>
        <View style={styles.demoNotice}><Text style={styles.noticeDot}>●</Text><Text style={styles.noticeText}>SIMULATED RESPONSE · Demo only</Text></View>
        <Text style={styles.eyebrow}>RESPONSE IN PROGRESS</Text><Text style={styles.title}>Your medic is{ '\n' }on the way.</Text>
        <Text style={styles.body}>A nearby standby scooter has been assigned in this prototype.</Text>
        <MapCard assigned />
        <View style={styles.etaCard}><View style={{ flex: 1 }}><Text style={styles.smallCaps}>ESTIMATED ARRIVAL</Text><Text style={styles.eta}>6 <Text style={{ fontSize: 17 }}>min</Text></Text></View><View style={styles.etaDivider} /><View style={{ flex: 1.3 }}><Text style={styles.smallCaps}>LIVE STATUS</Text><Text style={styles.statusText}>On the way <Text style={{ color: '#34A56C' }}>●</Text></Text><Text style={styles.cardSub}>ETA is simulated</Text></View></View>
        <View style={styles.medicCard}><View style={styles.avatar}><Text style={{ fontSize: 24 }}>👨🏽‍⚕️</Text></View><View style={{ flex: 1 }}><Text style={styles.cardTitle}>Thabo Mokoena</Text><Text style={styles.cardSub}>Emergency Care Assistant</Text><Text style={styles.cardSub}>Durban standby team · Demo profile</Text></View><View style={styles.rating}><Text style={{ color: BLUE, fontWeight: '900' }}>✓</Text></View></View>
        <TouchableOpacity style={[styles.familyButton, family && styles.familyOn]} onPress={() => setFamily(!family)}><Text style={{ fontSize: 18 }}>{family ? '✓' : '♧'}</Text><Text style={styles.familyText}>{family ? 'Family notification simulated' : 'Notify my emergency contact'}</Text><Text style={{ marginLeft: 'auto', color: MUTED }}>›</Text></TouchableOpacity>
        <TouchableOpacity style={styles.infoCard} onPress={() => setExpanded(!expanded)}><View style={{ flex: 1 }}><Text style={styles.cardTitle}>While you wait</Text><Text style={styles.cardSub}>Simple steps to keep the patient safe</Text></View><Text style={{ color: BLUE, fontWeight: '900' }}>{expanded ? '−' : '+'}</Text>{expanded && <View style={styles.expanded}><Text style={styles.tip}>• Keep the person still and comfortable.</Text><Text style={styles.tip}>• Apply firm pressure to serious bleeding.</Text><Text style={styles.tip}>• Follow the emergency operator’s instructions.</Text></View>}</TouchableOpacity>
        <TouchableOpacity style={styles.outlineButton} onPress={() => { setAssigned(false); setFamily(false); setScreen('home'); }}><Text style={styles.outlineText}>End demo response</Text></TouchableOpacity>
        <Text style={styles.callout}>For a real emergency, call <Text style={{ color: RED, fontWeight: '900' }}>112</Text>.</Text>
      </>}

      {screen === 'firstaid' && <><Text style={styles.eyebrow}>QUICK REFERENCE</Text><Text style={styles.title}>First aid{ '\n' }while you wait.</Text><Text style={styles.body}>Call 112 for life-threatening emergencies and follow the call handler’s advice.</Text>{[['01','Check the scene','Make sure it is safe to approach. Do not put yourself in danger.'],['02','Check responsiveness','Speak clearly and gently tap their shoulder. Ask someone to call 112.'],['03','Severe bleeding','Press firmly on the wound with clean cloth or gauze. Keep pressure on.'],['04','Keep them comfortable','Help them rest in a position that feels comfortable. Keep them warm.']].map(x => <View key={x[0]} style={styles.aidCard}><Text style={styles.aidNumber}>{x[0]}</Text><View style={{ flex: 1 }}><Text style={styles.cardTitle}>{x[1]}</Text><Text style={[styles.cardSub, { lineHeight: 20, marginTop: 5 }]}>{x[2]}</Text></View></View>)}<View style={styles.caution}><Text style={{ color: RED, fontWeight: '900' }}>Important</Text><Text style={[styles.cardSub,{ marginTop: 5, lineHeight: 19 }]}>These general pointers are not a substitute for professional guidance. Follow the emergency call handler’s instructions.</Text></View><TouchableOpacity style={styles.emergencyButton} onPress={() => setScreen('home')}><Text style={styles.emergencyIcon}>✚</Text><Text style={styles.emergencyText}>BACK TO EMERGENCY HOME</Text></TouchableOpacity></>}

      
      {screen === 'history' && (
        <>
          <Text style={styles.eyebrow}>YOUR ACTIVITY</Text>
          <Text style={styles.title}>Response{"\n"}history.</Text>
          <Text style={styles.body}>A record of requests made on this device.</Text>

          {responseHistory.length === 0 ? (
            <View style={styles.historyEmpty}>
              <Text style={{ fontSize: 27, color: '#AAB5C2' }}>◷</Text>
              <Text style={[styles.cardTitle, { marginTop: 10 }]}>No demo responses yet</Text>
              <Text style={[styles.cardSub, { textAlign: 'center', marginTop: 4 }]}>
                Your demo activity will appear here after you simulate an emergency request.
              </Text>
            </View>
          ) : (
            responseHistory.map(item => (
              <View key={item.id} style={styles.historyCard}>
                <View style={styles.historyIcon}>
                  <Text style={{ color: RED, fontSize: 19 }}>✚</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.type || 'Medical assistance'}</Text>
                  <Text style={styles.cardSub}>{item.location || 'Durban, KwaZulu-Natal'}</Text>
                  <Text style={styles.cardSub}>{item.date || new Date().toLocaleString()}</Text>
                  <View style={{ marginTop: 8 }}>
                    <Badge
                      color={item.status === 'Handover completed successfully' ? '#E5F6EC' : '#FFF0D6'}
                      textColor={item.status === 'Handover completed successfully' ? '#187442' : '#8A5A00'}
                    >
                      {item.status || 'Demo record'}
                    </Badge>
                  </View>
                  {item.reference && (
                    <Text style={styles.cardSub}>Reference: {item.reference}</Text>
                  )}
                </View>
              </View>
            ))
          )}
        </>
      )}

    </ScrollView>

    {screen !== 'login' &&
      screen !== 'patientSignup' &&
      screen !== 'communitySignup' && (
        <View style={styles.bottomNav}>
          {[
            ['home', '⌂', 'Home'],
            ['response', '◎', 'Response'],
            ['firstaid', '＋', 'First aid'],
            ['history', '◷', 'History'],
          ].map(([key, icon, label]) => (
            <TouchableOpacity
              key={key}
              onPress={() => nav(key)}
              style={styles.navItem}
            >
              <Text
                style={[
                  styles.navIcon,
                  screen === key && styles.navActive,
                ]}
              >
                {icon}
              </Text>

              <Text
                style={[
                  styles.navLabel,
                  screen === key && styles.navActive,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </SafeAreaView>;
}

const styles = StyleSheet.create({
  gbvCard: {
  backgroundColor: '#FFF1F1',
  padding: 18,
  borderRadius: 18,
  marginTop: 20,
  borderWidth: 1,
  borderColor: '#F5B8B8',
},
gbvTitle: {
  fontSize: 19,
  fontWeight: '800',
  color: '#8B0000',
  marginBottom: 8,
},
gbvDescription: {
  fontSize: 13,
  color: '#4A2525',
  lineHeight: 20,
  marginBottom: 14,
},
gbvButton: {
  backgroundColor: '#C62828',
  padding: 17,
  borderRadius: 12,
  alignItems: 'center',
},
gbvButtonText: {
  color: '#FFFFFF',
  fontSize: 15,
  fontWeight: '900',
},
gbvNote: {
  fontSize: 11,
  color: '#6B3636',
  marginTop: 10,
},
  loginCard: {
  backgroundColor: '#FFFFFF',
  padding: 20,
  borderRadius: 18,
  marginTop: 25,
},
inputLabel: {
  fontSize: 12,
  fontWeight: '800',
  color: '#071A36',
  marginBottom: 7,
  marginTop: 12,
},
loginInput: {
  backgroundColor: '#F5F7FA',
  borderWidth: 1,
  borderColor: '#D9DFE8',
  borderRadius: 12,
  padding: 14,
  fontSize: 14,
  marginBottom: 8,
},
  safe:{ flex:1, backgroundColor:'#F5F7FA' }, header:{ height:65, paddingHorizontal:20, flexDirection:'row', alignItems:'center', gap:11, backgroundColor:'#F5F7FA' }, brandMark:{ width:37,height:37,borderRadius:12,backgroundColor:RED,alignItems:'center',justifyContent:'center' },brand:{fontSize:16,fontWeight:'900',color:NAVY,letterSpacing:-.3},subBrand:{fontSize:9,fontWeight:'800',letterSpacing:1.3,color:MUTED,marginTop:2},helpButton:{width:35,height:35,borderRadius:12,backgroundColor:'white',alignItems:'center',justifyContent:'center'},content:{paddingHorizontal:20,paddingTop:8,paddingBottom:25},demoNotice:{height:34,borderRadius:9,backgroundColor:'#FFF1EF',flexDirection:'row',alignItems:'center',paddingHorizontal:11,gap:7,marginBottom:21},noticeDot:{fontSize:9,color:RED},noticeText:{fontSize:10,fontWeight:'900',color:'#A83128',letterSpacing:.55},eyebrow:{fontSize:10,fontWeight:'900',color:BLUE,letterSpacing:1.6,marginBottom:8},title:{fontSize:32,fontWeight:'900',letterSpacing:-1.2,lineHeight:35,color:NAVY},body:{fontSize:13,color:MUTED,lineHeight:19,marginTop:8,marginBottom:17},map:{height:193,borderRadius:19,backgroundColor:'#E5F0E8',overflow:'hidden',position:'relative',marginBottom:13},road:{position:'absolute',height:13,backgroundColor:'#F9FCF9',borderTopWidth:1,borderBottomWidth:1,borderColor:'#D6E3DB'},mapLabel:{position:'absolute',fontSize:9,fontWeight:'900',letterSpacing:1,color:'#9AAC9F'},userPin:{position:'absolute',width:28,height:28,borderRadius:20,backgroundColor:'rgba(0,48,135,.15)',alignItems:'center',justifyContent:'center',top:79,left:'30%'},pinDot:{width:12,height:12,borderRadius:8,backgroundColor:BLUE,borderWidth:3,borderColor:'white'},scooterPin:{position:'absolute',width:34,height:34,borderRadius:12,backgroundColor:RED,alignItems:'center',justifyContent:'center',top:115,left:'64%',borderWidth:3,borderColor:'white'},scooterMoving:{top:69,left:'58%'},routeLine:{position:'absolute',height:3,width:'32%',backgroundColor:RED,opacity:.75,left:'33%',top:105,transform:[{rotate:'-18deg'}]},mapCaption:{position:'absolute',left:10,bottom:9,backgroundColor:'rgba(255,255,255,.92)',paddingVertical:7,paddingHorizontal:9,borderRadius:9},nearby:{backgroundColor:'white',padding:12,borderRadius:15,flexDirection:'row',alignItems:'center',gap:10,marginBottom:11},nearbyIcon:{height:37,width:37,borderRadius:12,backgroundColor:'#EFF4FF',alignItems:'center',justifyContent:'center',color:BLUE},cardTitle:{fontSize:13,fontWeight:'900',color:NAVY},cardSub:{fontSize:11,color:MUTED,marginTop:3},badge:{paddingHorizontal:9,paddingVertical:6,borderRadius:7},emergencyButton:{height:61,borderRadius:15,backgroundColor:RED,flexDirection:'row',alignItems:'center',paddingHorizontal:15,gap:11,shadowColor:RED,shadowOpacity:.17,shadowRadius:9,elevation:3},emergencyIcon:{fontSize:19,color:'white'},emergencyText:{fontSize:12,fontWeight:'900',letterSpacing:.45,color:'white'},emergencySub:{fontSize:10,color:'#FFE2E0',marginTop:2},arrow:{fontSize:24,color:'white',marginLeft:'auto'},callout:{textAlign:'center',fontSize:11,color:MUTED,marginTop:12,marginBottom:13},quickRow:{flexDirection:'row',gap:10},quickCard:{backgroundColor:'white',borderRadius:14,flex:1,padding:13},quickIcon:{color:BLUE,fontSize:18,fontWeight:'900',marginBottom:6},quickTitle:{fontSize:12,fontWeight:'900',color:NAVY},quickSub:{fontSize:10,color:MUTED,marginTop:3},bottomNav:{height:67,backgroundColor:'white',borderTopWidth:1,borderColor:'#E9EDF2',flexDirection:'row',justifyContent:'space-around',alignItems:'center'},navItem:{alignItems:'center',minWidth:60},navIcon:{fontSize:19,color:'#9AA5B3'},navLabel:{fontSize:9,color:'#9AA5B3',marginTop:2,fontWeight:'700'},navActive:{color:BLUE},etaCard:{padding:16,borderRadius:16,backgroundColor:'white',flexDirection:'row',alignItems:'center',marginBottom:11},smallCaps:{fontSize:9,fontWeight:'900',letterSpacing:1,color:MUTED},eta:{fontSize:32,fontWeight:'900',color:RED,marginTop:3},etaDivider:{width:1,height:44,backgroundColor:'#E9EDF2',marginHorizontal:17},statusText:{fontSize:14,fontWeight:'900',color:NAVY,marginTop:5},medicCard:{backgroundColor:'white',padding:13,borderRadius:16,flexDirection:'row',alignItems:'center',gap:11,marginBottom:10},avatar:{width:49,height:49,borderRadius:16,backgroundColor:'#EAF0FA',alignItems:'center',justifyContent:'center'},rating:{width:28,height:28,borderRadius:14,backgroundColor:'#EFF4FF',alignItems:'center',justifyContent:'center'},familyButton:{backgroundColor:'white',padding:14,borderRadius:14,flexDirection:'row',alignItems:'center',gap:9,marginBottom:10},familyOn:{backgroundColor:'#EFF8F2'},familyText:{fontSize:12,fontWeight:'800',color:NAVY},infoCard:{backgroundColor:'white',padding:14,borderRadius:14,flexDirection:'row',flexWrap:'wrap',alignItems:'center'},expanded:{width:'100%',borderTopWidth:1,borderColor:'#EDF0F4',marginTop:12,paddingTop:10},tip:{fontSize:12,color:'#536174',lineHeight:22},outlineButton:{borderWidth:1,borderColor:'#D9DFE8',backgroundColor:'white',height:47,borderRadius:13,alignItems:'center',justifyContent:'center',marginTop:14},outlineText:{fontSize:12,fontWeight:'900',color:NAVY},aidCard:{backgroundColor:'white',padding:15,borderRadius:15,marginBottom:10,flexDirection:'row',gap:13,alignItems:'flex-start'},aidNumber:{fontSize:12,fontWeight:'900',color:RED,backgroundColor:'#FFF1EF',paddingHorizontal:9,paddingVertical:7,borderRadius:9},caution:{padding:14,borderRadius:14,backgroundColor:'#FFF1EF',marginVertical:6,marginBottom:16},historyCard:{backgroundColor:'white',padding:14,borderRadius:15,flexDirection:'row',gap:11,alignItems:'center',marginTop:4},historyIcon:{width:42,height:42,borderRadius:13,backgroundColor:'#FFF1EF',alignItems:'center',justifyContent:'center'},historyEmpty:{alignItems:'center',padding:25,marginTop:12,backgroundColor:'white',borderRadius:15}
});
