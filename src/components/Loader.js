import React, { Component } from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';

const Loader = props => {
  const { loading, label, ...attributes } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {console.log('close modal')}}>
      <View style={styles.modalBackground}>
        <View style={label ? styles.activityIndicatorWrapperWithLabel : styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={true} size="small" color="#0000ff"/>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 50,
    width: 50,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  activityIndicatorWrapperWithLabel: {
    backgroundColor: '#FFFFFF',
    height: 70,
    width: 170,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});

export default Loader;