/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  RecyclerViewBackedScrollView
} from 'react-native';

import Row from './Row';
import Header from './Header';
import Footer from './Footer'
import SectionHeader from './SectionHeader';
import data from './demoData'

export default class ThirtyDaysOfReactNative extends Component {
  constructor(props) {
    super(props);

    const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      getSectionData,
      getRowData,
    });
    
    // http://stackoverflow.com/questions/33798717/javascript-es6-const-with-curly-braces
    const {dataBlob, sectionIds, rowIds} = this.formatData(data);

    this.state = {
      dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
    };
  }

  formatData(data) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const dataBlob = {};
    const sectionIds = [];
    const rowIds = [];

    for (let sectionId = 0; sectionId < alphabet.length; sectionId++ ) {
      const currentChar = alphabet[sectionId];
      const users = data.filter((user) => user.name.first.toUpperCase().indexOf(currentChar) === 0);
      
      if (users.length > 0) {
        
        sectionIds.push(sectionId);
        dataBlob[sectionId] = { character: currentChar };

        rowIds.push([]);
        for (let i = 0; i < users.length; i++) {
          const rowId = `${sectionId}:${i}`;          
          rowIds[rowIds.length - 1].push(rowId);

          dataBlob[rowId] = users[i];
        }
      }
    }
    return {dataBlob, sectionIds, rowIds};
  }

  render() {
    return (
      <ListView 
      style = {styles.container} 
      dataSource={this.state.dataSource} 
      renderRow={(data) => <Row {...data} />} 
      renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      renderHeader={() => <Header />}
      renderFooter={() => <Footer />}
      renderSectionHeader = {(sectionData) => <SectionHeader {...sectionData} />} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

AppRegistry.registerComponent('ThirtyDaysOfReactNative', () => ThirtyDaysOfReactNative);
