import React, { useEffect } from 'react';
import { Row, Col, Typography, PageHeader, Descriptions, Space, Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../state'
import useFetchInfo from '../../common/hook/useFetchInfo';
import { Types } from '../../user/state';
import History from '../../common/component/History'
import TagList from './TagList'
import Department from './Department'
import FetchLabel from '../component/FetchLabel';

/**
 * 
 * @param {object} param
 * @param {import('react-router').match} param.match
 */
export default function User({ match }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user)
    const userHistory = useSelector(state => state.user.userHistory)

    const name = match.params.name;
    useEffect(() => {
        dispatch(actions.fetchUser(name))
        dispatch(actions.fetchUserHistory(name))
    }, [dispatch, name])

    // const isFetched = true;
    const { isFetched, isSlow } = useFetchInfo(Types.FetchUser);

    return (
        <Row justify="center">
            <Col xs={24} md={20} lg={14}>
                <PageHeader
                    onBack={history.goBack}
                    title={
                        <FetchLabel label="사용자 정보" actionType={Types.FetchUser} fetchKey=""/>
                    }>
                    {user && (
                        <Descriptions layout="vertical" bordered column={1}>
                            <Descriptions.Item label="이름">
                                <Typography.Text>{user.name}</Typography.Text>
                            </Descriptions.Item>
                            <Descriptions.Item label={<FetchLabel label="소속" actionType={Types.FetchUpdateUser} fetchKey="department" />}>
                                <Department />
                            </Descriptions.Item>
                            <Descriptions.Item label={<FetchLabel label="태그" actionType={Types.FetchUser} fetchKey="tag"/>}>
                                <TagList />
                            </Descriptions.Item>
                            <Descriptions.Item label="수정 내역">
                                <History items={userHistory} />
                            </Descriptions.Item>
                        </Descriptions>
                    )}
                    {!user && isFetched && (
                        <Typography.Text>존재하지 않는 사용자입니다.</Typography.Text>
                    )}
                </PageHeader>
            </Col>
        </Row>
    );
}