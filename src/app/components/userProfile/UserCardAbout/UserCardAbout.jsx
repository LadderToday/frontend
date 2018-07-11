import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router';

import { FormattedDate } from 'react-intl';

import { repLog10 } from 'app/utils/ParsersAndFormatters';
import normalizeProfile from 'app/utils/NormalizeProfile';

import Icon from 'golos-ui/Icon';
import Card, { CardTitle } from 'golos-ui/Card';

const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    margin: 17px 20px;
`;

const CardContentCounters = styled(CardContent)`
    margin: 0;
`;

const Row = styled.div`
    position: relative;
    display: flex;
    height: 70px;

    &:not(:last-of-type) {
        margin-top: 1px;

        &:after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 20px;
            right: 20px;
            height: 1px;
            background: #e1e1e1;
        }
    }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;

    &:first-of-type {
        margin-right: -1px;

        &:after {
            content: '';
            position: absolute;
            top: 10px;
            bottom: 10px;
            right: 0;
            width: 1px;
            background: #e1e1e1;
        }
    }
`;

const Bold = styled.div`
    color: #333;
    font-family: ${({theme}) => theme.fontFamily};
    font-size: 20px;
    font-weight: bold;
    line-height: 1;
    margin-bottom: 5px;
`;

const Title = styled.div`
    color: #393636;
    font-family: ${({theme}) => theme.fontFamily};
    font-size: 14px;
    font-weight: 300;
    line-height: 1;
    text-transform: lowercase;
`;

const UserCardCity = styled.div`
    color: #393636;
    font-family: ${({theme}) => theme.fontFamily};
    font-size: 13px;
    font-weight: 400;
    line-height: 1;
    text-transform: initial;
`;

const UserCardSite = styled(Link)`
    color: #2879ff;
    font-family: 'Open Sans';
    font-size: 14px;
    letter-spacing: 0.25px;
    line-height: 1;
    margin-bottom: 12px;
    text-decoration: underline;
`;
const UserCardBio = styled.div`
    font-family: 'Open Sans';
    font-size: 16px;
    font-weight: 300;
    line-height: 24px;
    color: #7d7d7d;
`;

const SocialLink = styled(Link)`
    color: #333;
`;

export default class UserCardAbout extends PureComponent {
    static propTypes = {
        account: PropTypes.object,
        followerCount: PropTypes.number,
        followingCount: PropTypes.number,
    };

    render() {
        const { account, followerCount, followingCount } = this.props;
        const { location, gender, about, website } = normalizeProfile(account);

        // set account join date
        let accountJoin = account.created;
        const transferFromSteemToGolosDate = '2016-09-29T12:00:00';
        if (new Date(accountJoin) < new Date(transferFromSteemToGolosDate)) {
            accountJoin = transferFromSteemToGolosDate;
        }

        const websiteLabel = website
            ? website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
            : null;

        const reputation = repLog10(account.reputation);

        return (
            <Card style={{ width: '273px' }}>
                <CardTitle>Краткая информация</CardTitle>
                <CardContentCounters>
                    <Row>
                        <Column>
                            <Bold>{account.post_count}</Bold>
                            <Title>Постов</Title>
                        </Column>
                        <Column>
                            <Bold>{followingCount}</Bold>
                            <Title>Подписчиков</Title>
                        </Column>
                    </Row>

                    <Row>
                        <Column>
                            <Bold>{followerCount}</Bold>
                            <Title>Подписок</Title>
                        </Column>
                        <Column>
                            <Bold>{reputation}</Bold>
                            <Title>Рейтинг</Title>
                        </Column>
                    </Row>

                    <Row>
                        <Column>
                            <Bold>{gender}</Bold>
                            <Title>Пол</Title>
                        </Column>
                        <Column>
                            <Bold>
                                <FormattedDate
                                    value={accountJoin}
                                    year="numeric"
                                    month="numeric"
                                    day="numeric"
                                />
                            </Bold>
                            <Title>Дата регистрации</Title>
                        </Column>
                    </Row>
                </CardContentCounters>

                {(website || about || location) && (
                    <CardTitle justify="space-between">
                        О себе{location && (
                            <UserCardCity>{location}</UserCardCity>
                        )}
                    </CardTitle>
                )}
                {(website || about) && (
                    <CardContent>
                        {website && (
                            <UserCardSite to={website}>
                                {websiteLabel}
                            </UserCardSite>
                        )}
                        {about && <UserCardBio>{about}</UserCardBio>}
                    </CardContent>
                )}

                <CardTitle justify="space-between">
                    <SocialLink to="#">
                        <Icon name="facebook" width="13px" height="24px" />
                    </SocialLink>
                    <SocialLink to="#">
                        <Icon name="vk" width="28px" height="18px" />
                    </SocialLink>
                    <SocialLink to="#">
                        <Icon name="instagram" size="23px" />
                    </SocialLink>
                    <SocialLink to="#">
                        <Icon name="twitter" width="26px" height="22px" />
                    </SocialLink>
                </CardTitle>
            </Card>
        );
    }
}