import db
import pytest_check as check

def test_login():
    account=MakeLogin()
    
    fail=db.login(account,"IncorrectPassword")
    Success=db.login(account,"123")
    check.equal(fail,None)
    check.is_not_none(Success)

def test_createProject():

    account=MakeLogin()
    
    proj=db.create_project(account, "TestProjName", "Test description")
    check.is_not_none(proj)
    Projects = db.get_user_projects(account)

    check.is_true(Projects.find("TestProjName")!=-1)


def test_HwSet():

    account=MakeLogin()
    
    db.create_hw_set("testSet",10)
    listOfHw=db.get_hw_sets()
    check.is_true(listOfHw.find("testSet")!=-1)

def MakeLogin():
    madeLogin=bool(False)
    testName=0
    while(madeLogin!=True):
        testName+=1
        madeLogin=db.create_acct(str(testName), str(testName), "123")
    return str(testName)
